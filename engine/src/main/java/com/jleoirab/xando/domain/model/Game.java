package com.jleoirab.xando.domain.model;

import com.jleoirab.xando.domain.model.errors.*;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;
import org.apache.logging.log4j.util.Strings;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

import java.util.Optional;

/** Created by jleoirab on 2021-02-09 */
@Data
@Builder
public class Game {
    // Max number of chars that can be in the gameBoard string.
    private static final int MAX_BOARD_CHARS = 17;

    @Id
    private String uid;
    @Indexed
    @NonNull private String gameId;
    @NonNull private String gameCreatorPlayerId;
    private GamePlayer playerX;
    private GamePlayer playerO;
    @NonNull @Builder.Default private String gameBoard = ",,,,,,,,";
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

        if (playerX != null) {
            playerX = gamePlayer;
        } else if (playerO != null) {
            playerO = gamePlayer;
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
        verifyMove(move);
        updateGameBoard(move);
        setNextPlayerTurn();
        evaluateGameStatus();
    }

    private void verifyMove(Move move) throws XAndOGameError {
        if (!currentPlayerTurn.equals(move.getPlayerTag())) {
            throw new PlayOutOfTurnException();
        }

        GamePlayer gamePlayer = (currentPlayerTurn == PlayerTag.PLAYER_X) ? playerX : playerO;

        Player player = move.getPlayer();

        if (!player.getPlayerId().equals(gamePlayer.getPlayerId())) {
            throw new IllegalPlayerMoveException();
        }
    }

    private void updateGameBoard(Move move) throws CellAlreadyOccupiedException {
        String[] cells = gameBoard.split(",");
        PlayerTag playerTag = move.getPlayerTag();
        if (!Strings.isEmpty(cells[move.getCellIndex()])) {
            throw new CellAlreadyOccupiedException();
        }

        cells[move.getCellIndex()] = playerTag.toString();
        gameBoard = String.join(",", cells);
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
        return gameBoard.length() < MAX_BOARD_CHARS;
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
        String[] cells = gameBoard.split(",");

        if (Strings.isNotEmpty(cells[0]) && cells[0].equals(cells[1]) && cells[0].equals(cells[2])) {
            return Optional.of(PlayerTag.from(cells[0]));
        }

        if (Strings.isNotEmpty(cells[3]) && cells[3].equals(cells[4]) && cells[3].equals(cells[5])) {
            return Optional.of(PlayerTag.from(cells[0]));
        }

        if (Strings.isNotEmpty(cells[6]) && cells[6].equals(cells[7]) && cells[6].equals(cells[8])) {
            return Optional.of(PlayerTag.from(cells[0]));
        }

        return Optional.empty();
    }

    private Optional<PlayerTag> checkForWinnerInColumns() {
        String[] cells = gameBoard.split(",");

        if (Strings.isNotEmpty(cells[0]) && cells[0].equals(cells[3]) && cells[0].equals(cells[6])) {
            return Optional.of(PlayerTag.from(cells[0]));
        }

        if (Strings.isNotEmpty(cells[1]) && cells[1].equals(cells[4]) && cells[1].equals(cells[7])) {
            return Optional.of(PlayerTag.from(cells[0]));
        }

        if (Strings.isNotEmpty(cells[2]) && cells[2].equals(cells[5]) && cells[2].equals(cells[8])) {
            return Optional.of(PlayerTag.from(cells[0]));
        }

        return Optional.empty();
    }

    private Optional<PlayerTag> checkForWinnerInDiagonals() {
        String[] cells = gameBoard.split(",");

        if (Strings.isNotEmpty(cells[0]) && cells[0].equals(cells[1]) && cells[0].equals(cells[2])) {
            return Optional.of(PlayerTag.from(cells[0]));
        }

        if (Strings.isNotEmpty(cells[3]) && cells[3].equals(cells[4]) && cells[3].equals(cells[5])) {
            return Optional.of(PlayerTag.from(cells[0]));
        }

        return Optional.empty();
    }
}
