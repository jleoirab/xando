package com.jleoirab.xando.domain.model;

import com.jleoirab.xando.domain.errors.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Created by jleoirab on 2021-02-16
 */
class GameTest {
    // Static variable declaration
    private static final char X = PlayerTag.PLAYER_X.getChar();
    private static final char O = PlayerTag.PLAYER_O.getChar();
    private static final char E = Game.EMPTY_CELL;

    private static final Player PLAYER1 = Player.builder()
            .playerId("player-1")
            .playerName("player 1")
            .build();

    private static final Player PLAYER2 = Player.builder()
            .playerId("player-2")
            .playerName("player 2")
            .build();

    // System under test
    private Game sut;

    // Collaborators

    // Helpers
    @BeforeEach
    void setup() {
        sut = Game.builder()
                .gameId("game-id")
                .gameCreatorPlayerId(PLAYER1.getPlayerId())
                .build();
    }

    private void givenGameStateIs(GameState state) {
        sut.setGameStatus(GameStatus.builder()
                .state(state)
                .build());
    }

    private void givenCreatorIs(PlayerTag tag) {
        if (tag == PlayerTag.PLAYER_X )  sut.setPlayerX(GamePlayer.from(PLAYER1));
        else sut.setPlayerO(GamePlayer.from(PLAYER1));
    }

    private void givenGameIsInProgress(PlayerTag tag) throws XAndOGameError {
        givenCreatorIs(tag);
        sut.acceptPlayer(PLAYER2);
    }

    private void givenCurrentPlayerTurnIs(PlayerTag tag) {
        sut.setCurrentPlayerTurn(tag);
    }

    private void givenGameBoardIs(char[] board) {
        sut.setGameBoard(board);
    }

    private void whenAcceptPlayer(Player player) throws XAndOGameError {
        sut.acceptPlayer(player);
    }

    private void thenJoiningPlayerIs(PlayerTag tag) {
        GamePlayer player = (tag == PlayerTag.PLAYER_X) ? sut.getPlayerX() : sut.getPlayerO();

        assertEquals(PLAYER2.getPlayerId(), player.getPlayerId());
        assertEquals(PLAYER2.getPlayerName(), player.getPlayerName());
    }

    private void thenGameStateIsSetToInProgress() {
        assertEquals(GameState.IN_PROGRESS, sut.getGameStatus().getState());
    }

    @Test
    void test_Given_GameIsAlreadyInProgress_When_AcceptPlayer_Then_ShouldThrowGameAlreadyStartedException() {
        givenGameStateIs(GameState.IN_PROGRESS);
        assertThrows(GameAlreadyStartedException.class, () -> whenAcceptPlayer(PLAYER2));
    }

    @Test
    void test_Given_GameIsAlreadyFinished_When_AcceptPlayer_Then_ShouldThrowGameAlreadyStartedException() {
        givenGameStateIs(GameState.FINISHED);
        assertThrows(GameAlreadyStartedException.class, () -> whenAcceptPlayer(PLAYER2));
    }

    @Test
    void test_Given_PlayerJoiningIsCreator_When_AcceptPlayer_Then_ShouldThrowPlayerIsCreatorException() {
        assertThrows(PlayerIsCreatorException.class, () -> whenAcceptPlayer(PLAYER1));
    }

    @Test
    void test_Given_CreatorIsPlayerX_When_AcceptPlayer_Then_PlayerJoiningShouldBePlayerO() throws XAndOGameError {
        givenCreatorIs(PlayerTag.PLAYER_X);
        whenAcceptPlayer(PLAYER2);
        thenJoiningPlayerIs(PlayerTag.PLAYER_O);
        thenGameStateIsSetToInProgress();
    }

    @Test
    void test_Given_CreatorIsPlayerO_When_AcceptPlayer_Then_PlayerJoiningShouldBePlayerX() throws XAndOGameError {
        givenCreatorIs(PlayerTag.PLAYER_O);
        whenAcceptPlayer(PLAYER2);
        thenJoiningPlayerIs(PlayerTag.PLAYER_X);
        thenGameStateIsSetToInProgress();
    }

    @Test
    void test_Given_PlayerMovesOutOfTurn_When_AcceptMove_Then_ShouldThrowOutOfTurnException() throws XAndOGameError {
        givenGameIsInProgress(PlayerTag.PLAYER_X);
        givenCurrentPlayerTurnIs(PlayerTag.PLAYER_X);
        assertThrows(PlayOutOfTurnException.class, () -> sut.acceptMove(Move.builder()
                .player(PLAYER2)
                .playerTag(PlayerTag.PLAYER_O)
                .cellIndex(0)
                .build()));
    }

    @Test
    void test_Given_PlayerMovesWithWrongPlayerTag_When_AcceptMove_Then_ShouldThrowIllegalPlayerMoveException() throws XAndOGameError {
        givenGameIsInProgress(PlayerTag.PLAYER_X);
        givenCurrentPlayerTurnIs(PlayerTag.PLAYER_X);
        assertThrows(IllegalPlayerMoveException.class, () -> sut.acceptMove(Move.builder()
                .player(PLAYER2)
                .playerTag(PlayerTag.PLAYER_X)
                .cellIndex(0)
                .build()));
    }

    @Test
    void test_Given_CellIsAlreadyOccupied_When_AcceptMove_Then_ShouldThrowCellAlreadyOccupiedException() throws XAndOGameError {
        givenGameIsInProgress(PlayerTag.PLAYER_X);
        givenCurrentPlayerTurnIs(PlayerTag.PLAYER_O);
        givenGameBoardIs(new char[]{X, E, E, E, E, E, E, E, E});
        assertThrows(CellAlreadyOccupiedException.class, () -> sut.acceptMove(Move.builder()
                .player(PLAYER2)
                .playerTag(PlayerTag.PLAYER_O)
                .cellIndex(0)
                .build()));
    }

    @Test
    void test_Given_CellIndexIsInvalid_When_AcceptMove_Then_ShouldThrowCellAlreadyOccupiedException() throws XAndOGameError {
        givenGameIsInProgress(PlayerTag.PLAYER_X);
        givenCurrentPlayerTurnIs(PlayerTag.PLAYER_O);
        givenGameBoardIs(new char[]{X, E, E, E, E, E, E, E, E});
        assertThrows(InvalidCellIndex.class, () -> sut.acceptMove(Move.builder()
                .player(PLAYER2)
                .playerTag(PlayerTag.PLAYER_O)
                .cellIndex(9)
                .build()));
    }

    @Test
    void test_Given_PlayerMakesValidMoveToWinGame_When_AcceptMove_Then_ShouldUpdateGameStatusToIndicateWin() throws XAndOGameError {
        givenGameIsInProgress(PlayerTag.PLAYER_O);
        givenCurrentPlayerTurnIs(PlayerTag.PLAYER_X);
        givenGameBoardIs(new char[]{X, X, E, E, E, E, E, E, E});

        sut.acceptMove(Move.builder()
                .player(PLAYER2)
                .playerTag(PlayerTag.PLAYER_X)
                .cellIndex(2)
                .build());

        assertArrayEquals(new char[]{X, X, X, E, E, E, E, E, E}, sut.getGameBoard());
        assertEquals(GameState.FINISHED, sut.getGameStatus().getState());
        assertEquals(PlayerTag.PLAYER_X, sut.getGameStatus().getWinner());
    }

    @Test
    void test_Given_PlayerMakesValidMoveToDrawGame_When_AcceptMove_Then_ShouldUpdateGameStatusToIndicateDraw() throws XAndOGameError {
        givenGameIsInProgress(PlayerTag.PLAYER_X);
        givenCurrentPlayerTurnIs(PlayerTag.PLAYER_O);
        givenGameBoardIs(new char[] {X,E,X,X,O,O,O,X,X});

        sut.acceptMove(Move.builder()
                .player(PLAYER2)
                .playerTag(PlayerTag.PLAYER_O)
                .cellIndex(1)
                .build());

        assertArrayEquals(new char[] {X,O,X,X,O,O,O,X,X}, sut.getGameBoard());
        assertEquals(GameState.FINISHED, sut.getGameStatus().getState());
        assertNull(sut.getGameStatus().getWinner());
    }

    @Test
    void test_Given_PlayerMakesValidMove_When_AcceptMove_Then_ShouldUpdateGameStatusToIndicateInProgress() throws XAndOGameError {
        givenGameIsInProgress(PlayerTag.PLAYER_X);
        givenCurrentPlayerTurnIs(PlayerTag.PLAYER_O);
        givenGameBoardIs(new char[] {E,E,E,E,X,E,E,E,E});

        sut.acceptMove(Move.builder()
                .player(PLAYER2)
                .playerTag(PlayerTag.PLAYER_O)
                .cellIndex(0)
                .build());

        assertArrayEquals(new char[] {O,E,E,E,X,E,E,E,E}, sut.getGameBoard());
        assertEquals(GameState.IN_PROGRESS, sut.getGameStatus().getState());
        assertNull(sut.getGameStatus().getWinner());
    }

    @Test
    void test_Given_SpotsLeftOnBoard_When_SpotsLeftOnBoard_Then_ShouldReturnTrue() throws XAndOGameError {
        givenGameIsInProgress(PlayerTag.PLAYER_X);
        givenGameBoardIs(new char[] {X,O,X,O,O,X,E,X,O});
        assertTrue(sut.spotsLeftOnBoard());
    }

    @Test
    void test_Given_NoSpotsLeftOnBoard_When_SpotsLeftOnBoard_Then_ShouldReturnFalse() throws XAndOGameError {
        givenGameIsInProgress(PlayerTag.PLAYER_X);
        givenGameBoardIs(new char[] {X,O,X,O,O,X,X,X,O});
        assertFalse(sut.spotsLeftOnBoard());
    }

    @Test
    void test_Given_PlayerXWinOnRow1_When_CheckForWinner_Then_ShouldReturnPlayerTag() throws XAndOGameError {
        givenGameIsInProgress(PlayerTag.PLAYER_X);
        givenGameBoardIs(new char[] {X,X,X,O,E,E,O,E,E});
        assertEquals(PlayerTag.PLAYER_X, sut.checkForWinner().orElse(null));
    }

    @Test
    void test_Given_PlayerOWinOnRow2_When_CheckForWinner_Then_ShouldReturnPlayerTag() throws XAndOGameError {
        givenGameIsInProgress(PlayerTag.PLAYER_X);
        givenGameBoardIs(new char[] {E,X,X,O,O,O,E,X,E});
        assertEquals(PlayerTag.PLAYER_O, sut.checkForWinner().orElse(null));
    }

    @Test
    void test_Given_PlayerOWinOnRow3_When_CheckForWinner_Then_ShouldReturnPlayerTag() throws XAndOGameError {
        givenGameIsInProgress(PlayerTag.PLAYER_X);
        givenGameBoardIs(new char[] {X,X,E,E,X,E,O,O,O});
        assertEquals(PlayerTag.PLAYER_O, sut.checkForWinner().orElse(null));
    }

    @Test
    void test_Given_PlayerXWinOnCol1_When_CheckForWinner_Then_ShouldReturnPlayerTag() throws XAndOGameError {
        givenGameIsInProgress(PlayerTag.PLAYER_X);
        givenGameBoardIs(new char[] {X,O,E,X,O,E,X,E,E});
        assertEquals(PlayerTag.PLAYER_X, sut.checkForWinner().orElse(null));
    }

    @Test
    void test_Given_PlayerOWinOnCol2_When_CheckForWinner_Then_ShouldReturnPlayerTag() throws XAndOGameError {
        givenGameIsInProgress(PlayerTag.PLAYER_X);
        givenGameBoardIs(new char[] {X,O,E,E,O,E,X,O,X});
        assertEquals(PlayerTag.PLAYER_O, sut.checkForWinner().orElse(null));
    }

    @Test
    void test_Given_PlayerOWinOnCol3_When_CheckForWinner_Then_ShouldReturnPlayerTag() throws XAndOGameError {
        givenGameIsInProgress(PlayerTag.PLAYER_X);
        givenGameBoardIs(new char[] {X,E,O,X,X,O,E,E,O});
        assertEquals(PlayerTag.PLAYER_O, sut.checkForWinner().orElse(null));
    }

    @Test
    void test_Given_PlayerOWinOnDiag1_When_CheckForWinner_Then_ShouldReturnPlayerTag() throws XAndOGameError {
        givenGameIsInProgress(PlayerTag.PLAYER_X);
        givenGameBoardIs(new char[] {O,E,X,O,O,X,X,O,O});
        assertEquals(PlayerTag.PLAYER_O, sut.checkForWinner().orElse(null));
    }

    @Test
    void test_Given_PlayerXWinOnDiag2_When_CheckForWinner_Then_ShouldReturnPlayerTag() throws XAndOGameError {
        givenGameIsInProgress(PlayerTag.PLAYER_X);
        givenGameBoardIs(new char[] {O,O,X,O,X,X,X,O,E});
        assertEquals(PlayerTag.PLAYER_X, sut.checkForWinner().orElse(null));
    }


}