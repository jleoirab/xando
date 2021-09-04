package com.jleoirab.xando.engine.domain.model;

import com.jleoirab.xando.engine.domain.errors.*;
import lombok.*;
import org.apache.logging.log4j.util.Strings;
import org.apache.logging.log4j.util.Supplier;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

import java.util.Optional;

/** Created by jleoirab on 2021-02-09 */
@Data
@Builder
public class Game {
    @Id
    private String uid;
    @Indexed
    @NonNull private String gameId;
    @NonNull private String gameCreatorPlayerId;
    private GamePlayer playerX;
    private GamePlayer playerO;
    @Setter(AccessLevel.PACKAGE)
    @NonNull @Builder.Default private String[] gameBoard = new String[9];
    @Builder.Default PlayerTag currentPlayerTurn = PlayerTag.PLAYER_X;
    @NonNull @Builder.Default private GameStatus gameStatus = GameStatus.builder().build();
    @Builder.Default private int revision = 1;

    /**
     * Used to accept a player into the game. If the player is already in the game, this will
     * throw a {@link XAndOGameError}. The player cannot be the creator of the
     * game because they are already in the game.
     * @param player The play attempting to join the game.
     * @throws XAndOGameError Exception thrown if there was a problem accepting the player into the game.
     */
    public void acceptPlayer(Player player) throws XAndOGameError {
        String playerId = player.getPlayerId();

        // player is already in the game do nothing.
        if ((playerX != null && playerX.getPlayerId().equals(playerId)) ||
                (playerO != null && playerO.getPlayerId().equals(playerId))) {
            return;
        }

        GamePlayer gamePlayer = GamePlayer.from(player);

        if (playerX == null) {
            playerX = gamePlayer;
        } else if (playerO == null) {
            playerO = gamePlayer;
        } else {
            throw new CannotJoinGameException();
        }

        GameStatus currentStatus = getGameStatus();

        setGameStatus(GameStatus.builder()
                .state(GameState.IN_PROGRESS)
                .winner(currentStatus.getWinner())
                .build());

        incrementRevision();
    }

    /**
     * Accept a move from a player. Verifies that the move can actually be made before attempting to update the
     * board. If the move is successfully made, the game status is re-evaluated.
     * @param move The move to be accepted.
     * @throws XAndOGameError Exception thrown if the move cannot be accepted.
     */
    public void acceptMove(Move move) throws XAndOGameError {
        verifyGameState(GameState.IN_PROGRESS, () -> new IllegalGameState(GameState.IN_PROGRESS));
        verifyPlayerMove(move);
        applyMove(move.getCellIndex(), move.getPlayerTag());
        evaluateGameStatus();
        setNextPlayerTurn();
        incrementRevision();
    }

    private void verifyGameState(GameState expectedState, Supplier<XAndOGameError> errorSupplier) throws XAndOGameError {
        if (gameStatus.getState() == expectedState) {
            return;
        }

        throw errorSupplier.get();
    }

    private void incrementRevision() {
        revision++;
    }

    private void verifyPlayerMove(Move move) throws XAndOGameError {
        if (!currentPlayerTurn.equals(move.getPlayerTag())) {
            throw new PlayOutOfTurnException();
        }

        GamePlayer gamePlayer = (currentPlayerTurn == PlayerTag.PLAYER_X) ? playerX : playerO;

        Player player = move.getPlayer();

        if (!player.getPlayerId().equals(gamePlayer.getPlayerId())) {
            throw new IllegalPlayerMoveException();
        }

        int cellIndex = move.getCellIndex();

        if (cellIndex < 0 || cellIndex >= 9) {
            throw new InvalidCellIndex();
        }

        if (Strings.isNotEmpty(gameBoard[cellIndex])) {
            throw new CellAlreadyOccupiedException();
        }
    }

    private void applyMove(int cellIndex, PlayerTag playerTag) {
        gameBoard[cellIndex] = playerTag.toString();
    }

    private void setNextPlayerTurn() {
        currentPlayerTurn = gameStatus.getState() != GameState.FINISHED ? currentPlayerTurn.opponent() : null;
    }

    private void evaluateGameStatus() {
        Optional<WinState> winState = checkForWinner();

        GameState state = (spotsLeftOnBoard() && winState.isEmpty()) ? GameState.IN_PROGRESS : GameState.FINISHED;

        PlayerTag winner = winState.map(WinState::getWinner).orElse(null);
        int[] winLine = winState.map(WinState::getWinLine).orElse(null);

        gameStatus = GameStatus.builder()
                .state(state)
                .winner(winner)
                .winLine(winLine)
                .build();
    }

    /**
     * Used to check if the game board still has spots that can be filled
     * @return True if spots are left on the board otherwise, false.
     */
    public boolean spotsLeftOnBoard() {
        for (String c : gameBoard) {
            if (Strings.isBlank(c)) return true;
        }
        
        return false;
    }

    /**
     * Used to check if there is a winner for this game based on the current state.
     * If the game is not in progress, it will not check for a winner on the board but will return
     * whatever the current game status says.
     * @return Optional player tag of the winner. It will be empty if there is no winner.
     */
    public Optional<WinState> checkForWinner() {
        if (gameStatus.getState() != GameState.IN_PROGRESS) {
            return Optional.ofNullable((WinState.builder()
                    .winner(getGameStatus().getWinner())
                    .winLine(getGameStatus().getWinLine())
                    .build()));
        }

        return checkForWinnerInRows()
                .or(this::checkForWinnerInColumns)
                .or(this::checkForWinnerInDiagonals);
    }

    private Optional<WinState> checkForWinnerInRows() {
        if (Strings.isNotBlank(gameBoard[0]) && gameBoard[0].equals(gameBoard[1]) && gameBoard[0].equals(gameBoard[2])) {
            return Optional.of(WinState.builder()
                    .winner(PlayerTag.from(gameBoard[0]))
                    .winLine(GameBoardLine.GameBoardLines.ROW_1.getCellIndexes())
                    .build());
        }

        if (Strings.isNotBlank(gameBoard[3]) && gameBoard[3].equals(gameBoard[4]) && gameBoard[3].equals(gameBoard[5])) {
            return Optional.of(WinState.builder()
                    .winner(PlayerTag.from(gameBoard[3]))
                    .winLine(GameBoardLine.GameBoardLines.ROW_2.getCellIndexes())
                    .build());
        }

        if (Strings.isNotBlank(gameBoard[6]) && gameBoard[6].equals(gameBoard[7]) && gameBoard[6].equals(gameBoard[8])) {
            return Optional.of(WinState.builder()
                    .winner(PlayerTag.from(gameBoard[6]))
                    .winLine(GameBoardLine.GameBoardLines.ROW_3.getCellIndexes())
                    .build());
        }

        return Optional.empty();
    }

    private Optional<WinState> checkForWinnerInColumns() {
        if (Strings.isNotBlank(gameBoard[0]) && gameBoard[0].equals(gameBoard[3]) && gameBoard[0].equals(gameBoard[6])) {
            return Optional.of(WinState.builder()
                    .winner(PlayerTag.from(gameBoard[0]))
                    .winLine(GameBoardLine.GameBoardLines.COL_1.getCellIndexes())
                    .build());
        }

        if (Strings.isNotBlank(gameBoard[1]) && gameBoard[1].equals(gameBoard[4]) && gameBoard[1].equals(gameBoard[7])) {
            return Optional.of(WinState.builder()
                    .winner(PlayerTag.from(gameBoard[1]))
                    .winLine(GameBoardLine.GameBoardLines.COL_2.getCellIndexes())
                    .build());
        }

        if (Strings.isNotBlank(gameBoard[2]) && gameBoard[2].equals(gameBoard[5]) && gameBoard[2].equals(gameBoard[8])) {
            return Optional.of(WinState.builder()
                    .winner(PlayerTag.from(gameBoard[2]))
                    .winLine(GameBoardLine.GameBoardLines.COL_3.getCellIndexes())
                    .build());
        }

        return Optional.empty();
    }

    private Optional<WinState> checkForWinnerInDiagonals() {
        if (Strings.isNotBlank(gameBoard[0]) && gameBoard[0].equals(gameBoard[4]) && gameBoard[0].equals(gameBoard[8])) {
            return Optional.of(WinState.builder()
                    .winner(PlayerTag.from(gameBoard[0]))
                    .winLine(GameBoardLine.GameBoardLines.DIAG_1.getCellIndexes())
                    .build());
        }

        if (Strings.isNotBlank(gameBoard[2]) && gameBoard[2].equals(gameBoard[4]) && gameBoard[2].equals(gameBoard[6])) {
            return Optional.of(WinState.builder()
                    .winner(PlayerTag.from(gameBoard[2]))
                    .winLine(GameBoardLine.GameBoardLines.DIAG_2.getCellIndexes())
                    .build());
        }

        return Optional.empty();
    }
}
