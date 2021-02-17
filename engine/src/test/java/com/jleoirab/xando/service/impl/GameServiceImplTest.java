package com.jleoirab.xando.service.impl;

import com.jleoirab.xando.domain.errors.PlayOutOfTurnException;
import com.jleoirab.xando.domain.errors.PlayerIsCreatorException;
import com.jleoirab.xando.domain.errors.XAndOGameError;
import com.jleoirab.xando.domain.model.*;
import com.jleoirab.xando.repository.GameRepository;
import com.jleoirab.xando.service.errors.NoGameFoundException;
import com.jleoirab.xando.service.errors.ServiceException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/** Created by jleoirab on 2021-02-12 */
@ExtendWith(MockitoExtension.class)
class GameServiceImplTest {
    // Static variable declaration
    private final Player PLAYER_X = Player.builder().playerId("player-id").playerName("player-x").build();
    private static final String GAME_ID = "game-id";
    private static final int CELL_INDEX = 3;
    private static final PlayerTag PLAYER_TAG = PlayerTag.PLAYER_X;

    // System under test
    private GameServiceImpl sut;

    // Collaborators
    @Mock
    private GameRepository gameRepository;

    @Mock
    private Game game;

    private Player player;

    // Helpers
    @BeforeEach
    void setup() {
        player = PLAYER_X;
        sut = new GameServiceImpl(gameRepository);
    }

    private void givenGameNotFound() {
        when(gameRepository.findByGameId(GAME_ID)).thenReturn(Optional.empty());
    }

    private void givenGameFound() {
        when(gameRepository.findByGameId(GAME_ID)).thenReturn(Optional.of(game));
    }

    private void givenCannotJoinGame() throws XAndOGameError {
        doThrow(PlayerIsCreatorException.class).when(game).acceptPlayer(player);
    }

    private void givenErrorMakingMove() throws XAndOGameError {
        doThrow(PlayOutOfTurnException.class).when(game).acceptMove(any(Move.class));
    }

    private void whenJoinGame() throws XAndOGameError, ServiceException {
        sut.joinGame(GAME_ID, player);
    }

    private void whenMakeMove() throws XAndOGameError, ServiceException {
        sut.makeMove(GAME_ID, player, PLAYER_TAG, CELL_INDEX);
    }

    @Test
    void test_Given_Player_When_CreateGame_then_ShouldCreateGame() {
        when(gameRepository.save(any(Game.class))).thenAnswer(i -> i.getArgument(0));

        Game game = sut.createGame(PLAYER_X);

        verify(gameRepository).save(any(Game.class));
        assertEquals(GamePlayer.from(PLAYER_X), game.getPlayerX());
        assertNull(game.getPlayerO());
        assertArrayEquals(new String[9], game.getGameBoard());
        assertEquals(PLAYER_X.getPlayerId(), game.getGameCreatorPlayerId());
        assertEquals(PlayerTag.PLAYER_X, game.getCurrentPlayerTurn());
        assertNull(game.getGameStatus().getWinner());
        assertEquals(GameState.CREATED, game.getGameStatus().getState());
    }

    @Test
    void test_Given_GameNotFound_When_JoinGame_Then_ShouldThrowNoGameFoundException() {
        givenGameNotFound();
        assertThrows(NoGameFoundException.class, this::whenJoinGame);

    }

    @Test
    void test_Given_GameFoundButCannotJoinGame_When_JoinGame_Then_ShouldThrowXAndOException() throws XAndOGameError, ServiceException {
        givenGameFound();
        givenCannotJoinGame();
        assertThrows(PlayerIsCreatorException.class, this::whenJoinGame);
    }

    @Test
    void test_Given_EverythingIsGood_When_JoinGame_Then_ShouldJoinGameAndSaveUpdates() throws XAndOGameError, ServiceException {
        givenGameFound();
        whenJoinGame();
        verify(game).acceptPlayer(player);
        verify(gameRepository).save(game);
    }

    @Test
    void test_Given_GameNotFound_When_MakeMove_Then_ShouldThrowNoGameFoundException() {
        givenGameNotFound();
        assertThrows(NoGameFoundException.class, this::whenMakeMove);
    }

    @Test
    void test_Given_ErrorMakingMove_When_MakeMove_Then_ShouldThrowError() throws XAndOGameError {
        givenGameFound();
        givenErrorMakingMove();
        assertThrows(PlayOutOfTurnException.class, this::whenMakeMove);
    }

    @Test
    void test_Given_EverythingIsGood_When_MakeMove_Then_ShouldMakeMoveAndSaveUpdates() throws XAndOGameError, ServiceException {
        givenGameFound();
        whenMakeMove();
        verify(game).acceptMove(Move.builder()
                .player(player)
                .playerTag(PLAYER_TAG)
                .cellIndex(CELL_INDEX)
                .build());
        verify(gameRepository).save(game);
    }


}
