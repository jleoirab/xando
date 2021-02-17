package com.jleoirab.xando.domain.model;

import com.jleoirab.xando.domain.errors.*;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

import java.util.Optional;

/** Created by jleoirab on 2021-02-09 */
@Data
@Builder
public class Game {
    // Max number of chars that can be in the gameBoard string.
    private static final int MAX_BOARD_CHARS = 17;
    static final char EMPTY_CELL = Character.MIN_VALUE;

    @Id
    private String uid;
    @Indexed
    @NonNull private String gameId;
    @NonNull private String gameCreatorPlayerId;
    private GamePlayer playerX;
    private GamePlayer playerO;
    @Setter(AccessLevel.PACKAGE)
    @NonNull @Builder.Default private char[] gameBoard = new char[9];
    @Builder.Default PlayerTag currentPlayerTurn = PlayerTag.PLAYER_X;
    @NonNull @Builder.Default private GameStatus gameStatus = GameStatus.builder().build();

    /**
     * Used to accept a player into the game. If the player is already in the game, this will
     * throw a {@link XAndOGameError}. The player cannot be the creator of the
     * game because they are already in the game.
     * @param player The play attempting to join the game.
     * @throws XAndOGameError Exception thrown if there was a problem accepting the player into the game.
     */
    public void acceptPlayer(Player player) throws XAndOGameError {
        if (gameStatus.getState() != GameState.CREATED) {
            throw new GameAlreadyStartedException();
        }

        String playerId = player.getPlayerId();

        if (gameCreatorPlayerId.equals(playerId)) {
            throw new PlayerIsCreatorException();
        }

        GamePlayer gamePlayer = GamePlayer.from(player);

        if (playerX == null) {
            playerX = gamePlayer;
        } else if (playerO == null) {
            playerO = gamePlayer;
        } else {
            throw new IllegalStateException("All spots are taken but game has not started. This is weird.");
        }

        GameStatus currentStatus = getGameStatus();

        setGameStatus(GameStatus.builder()
                .state(GameState.IN_PROGRESS)
                .winner(currentStatus.getWinner())
                .build());
    }

    /**
     * Accept a move from a player. Verifies that the move can actually be made before attempting to update the
     * board. If the move is successfully made, the game status is re-evaluated.
     * @param move The move to be accepted.
     * @throws XAndOGameError Exception thrown if the move cannot be accepted.
     */
    public void acceptMove(Move move) throws XAndOGameError {
        verifyPlayerMove(move);
        applyMove(move.getCellIndex(), move.getPlayerTag());
        setNextPlayerTurn();
        evaluateGameStatus();
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

        if (gameBoard[cellIndex] != EMPTY_CELL) {
            throw new CellAlreadyOccupiedException();
        }
    }

    private void applyMove(int cellIndex, PlayerTag playerTag) {
        gameBoard[cellIndex] = playerTag.getChar();
    }

    private void setNextPlayerTurn() {
        currentPlayerTurn = currentPlayerTurn.opponent();
    }

    private void evaluateGameStatus() {
        Optional<PlayerTag> winner = checkForWinner();

        GameState state = (spotsLeftOnBoard() && winner.isEmpty()) ? GameState.IN_PROGRESS : GameState.FINISHED;

        gameStatus = GameStatus.builder()
                .state(state)
                .winner(winner.orElse(null))
                .build();
    }

    /**
     * Used to check if the game board still has spots that can be filled
     * @return True if spots are left on the board otherwise, false.
     */
    public boolean spotsLeftOnBoard() {
        for (char c : gameBoard) {
            if (c == EMPTY_CELL) return true;
        }
        
        return false;
    }

    /**
     * Used to check if there is a winner for this game based on the current state.
     * If the game is not in progress, it will not check for a winner on the board but will return
     * whatever the current game status says.
     * @return Optional player tag of the winner. It will be empty if there is no winner.
     */
    public Optional<PlayerTag> checkForWinner() {
        if (gameStatus.getState() != GameState.IN_PROGRESS) return Optional.ofNullable(gameStatus.getWinner());

        return checkForWinnerInRows()
                .or(this::checkForWinnerInColumns)
                .or(this::checkForWinnerInDiagonals);
    }

    private Optional<PlayerTag> checkForWinnerInRows() {
        if (gameBoard[0] != EMPTY_CELL && gameBoard[0] == gameBoard[1] && gameBoard[0] == gameBoard[2]) {
            return Optional.of(PlayerTag.from(gameBoard[0]));
        }

        if (gameBoard[3] != EMPTY_CELL && gameBoard[3] == gameBoard[4] && gameBoard[3] == gameBoard[5]) {
            return Optional.of(PlayerTag.from(gameBoard[3]));
        }

        if (gameBoard[6] != EMPTY_CELL && gameBoard[6] == gameBoard[7] && gameBoard[6] == gameBoard[8]) {
            return Optional.of(PlayerTag.from(gameBoard[6]));
        }

        return Optional.empty();
    }

    private Optional<PlayerTag> checkForWinnerInColumns() {
        if (gameBoard[0] != EMPTY_CELL && gameBoard[0] == gameBoard[3] && gameBoard[0] == gameBoard[6]) {
            return Optional.of(PlayerTag.from(gameBoard[0]));
        }

        if (gameBoard[1] != EMPTY_CELL && gameBoard[1] == gameBoard[4] && gameBoard[1] == gameBoard[7]) {
            return Optional.of(PlayerTag.from(gameBoard[1]));
        }

        if (gameBoard[2] != EMPTY_CELL && gameBoard[2] == gameBoard[5] && gameBoard[2] == gameBoard[8]) {
            return Optional.of(PlayerTag.from(gameBoard[2]));
        }

        return Optional.empty();
    }

    private Optional<PlayerTag> checkForWinnerInDiagonals() {
        if (gameBoard[0] != EMPTY_CELL && gameBoard[0] == gameBoard[4] && gameBoard[0] == gameBoard[8]) {
            return Optional.of(PlayerTag.from(gameBoard[0]));
        }

        if (gameBoard[2] != EMPTY_CELL && gameBoard[2] == gameBoard[4] && gameBoard[2] == gameBoard[6]) {
            return Optional.of(PlayerTag.from(gameBoard[2]));
        }

        return Optional.empty();
    }
}
