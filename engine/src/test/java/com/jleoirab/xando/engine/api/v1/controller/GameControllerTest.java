package com.jleoirab.xando.engine.api.v1.controller;

import com.jleoirab.xando.engine.api.v1.request.CreateGameRequest;
import com.jleoirab.xando.engine.api.v1.request.MakeMoveRequest;
import com.jleoirab.xando.engine.api.v1.resources.ApiGame;
import com.jleoirab.xando.engine.api.v1.resources.ApiPlayerTag;
import com.jleoirab.xando.engine.domain.errors.GameAlreadyStartedException;
import com.jleoirab.xando.engine.domain.errors.PlayOutOfTurnException;
import com.jleoirab.xando.engine.domain.errors.PlayerIsCreatorException;
import com.jleoirab.xando.engine.domain.errors.XAndOGameError;
import com.jleoirab.xando.engine.domain.model.Game;
import com.jleoirab.xando.engine.domain.model.Player;
import com.jleoirab.xando.engine.service.GameService;
import com.jleoirab.xando.engine.service.errors.GameCreationException;
import com.jleoirab.xando.engine.service.errors.ServiceException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;

/** Created by jleoirab on 2021-02-11 */
@ExtendWith(MockitoExtension.class)
class GameControllerTest {
    private static final Player PLAYER = Player.builder()
            .playerId("player-id")
            .playerName("player-name")
            .build();

    private static final ApiGame API_GAME = ApiGame.from(Game.builder()
            .gameId("game-id")
            .gameCreatorPlayerId(PLAYER.getPlayerId())
            .build());

    private static final Game GAME = Game.builder()
            .gameId(API_GAME.getId())
            .gameCreatorPlayerId(PLAYER.getPlayerId())
            .gameBoard(API_GAME.getGameBoard())
            .build();


    private GameController sut;

    @Mock private GameService gameService;
    private ApiGame response;
    private Player authenticatedPrincipal;

    @BeforeEach
    void setup() {
        authenticatedPrincipal = PLAYER;
        sut = new GameController(gameService);
    }

    private void givenNoErrorInCreation() throws ServiceException {
        when(gameService.createGame(any())).thenReturn(GAME);
    }

    private void givenErrorInCreation() throws ServiceException {
        when(gameService.createGame(any())).thenThrow(GameCreationException.class);
    }

    private void givenErrorWhenJoinGame(Class<? extends XAndOGameError> error) throws XAndOGameError, ServiceException {
        when(gameService.joinGame(any(), any())).thenThrow(error);
    }

    private void givenNoErrorWhenJoinGame() throws XAndOGameError, ServiceException {
        when(gameService.joinGame(any(), any())).thenReturn(GAME);
    }

    private void givenErrorWhenMakeMove(Class<? extends XAndOGameError> error) throws XAndOGameError, ServiceException {
        when(gameService.makeMove(any(), any(), any(), anyInt())).thenThrow(error);
    }

    private void givenNoErrorWhenMakeMove() throws XAndOGameError, ServiceException {
        when(gameService.makeMove(any(), any(), any(), anyInt())).thenReturn(GAME);
    }

    private void givenAuthenticatedPrincipalIsNull() {
        authenticatedPrincipal = null;
    }

    private void whenCreateGame() {
        CreateGameRequest createGameRequest = CreateGameRequest.builder().build();

        response = sut.createGame(authenticatedPrincipal, createGameRequest);
    }

    private void whenJoinGame() {
        response = sut.joinGame(authenticatedPrincipal, API_GAME.getId());
    }

    private void whenMakeMove() {
        MakeMoveRequest request = MakeMoveRequest.builder()
                .playerTag(ApiPlayerTag.O)
                .cellIndex(2)
                .build();

        response = sut.makeMove(authenticatedPrincipal, API_GAME.getId(), request);
    }

    private void thenShouldReturnApiGame() {
        assertEquals(API_GAME, response);
    }

    @Test
    void test_Given_RequestAndNoErrorInCreation_When_CreateGame_then_ShouldReturnApiGame()
            throws ServiceException {
        givenNoErrorInCreation();
        whenCreateGame();
        thenShouldReturnApiGame();
    }

    @Test
    void test_Given_RequestAndErrorInCreation_When_CreateGame_then_ShouldThrowApiException()
            throws ServiceException {
        givenErrorInCreation();
        ApiException exception = assertThrows(ApiException.class, this::whenCreateGame);
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    void test_Given_AuthenticatedPrincipalIsNull_When_CreateGame_then_ShouldThrowApiException() {
        givenAuthenticatedPrincipalIsNull();
        ApiException exception = assertThrows(ApiException.class, this::whenCreateGame);
        assertEquals(HttpStatus.FORBIDDEN, exception.getStatus());
    }

    @Test
    void test_Given_AuthenticatedPrincipalIsNull_When_JoinGame_Then_ShouldThrowApiException() {
        givenAuthenticatedPrincipalIsNull();
        ApiException exception = assertThrows(ApiException.class, this::whenCreateGame);
        assertEquals(HttpStatus.FORBIDDEN, exception.getStatus());
    }

    @Test
    void test_Given_ExceptionIsThrown_When_JoiningGame_Then_ShouldThrowApiException() throws XAndOGameError, ServiceException {
        givenErrorWhenJoinGame(GameAlreadyStartedException.class);
        ApiException exception = assertThrows(ApiException.class, this::whenJoinGame);
        assertEquals(HttpStatus.FORBIDDEN, exception.getStatus());
    }

    @Test
    void test_Given_PlayerIsCreator_When_JoiningGame_Then_ShouldThrowApiException() throws XAndOGameError, ServiceException {
        givenErrorWhenJoinGame(PlayerIsCreatorException.class);
        ApiException exception = assertThrows(ApiException.class, this::whenJoinGame);
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    void test_Given_NoError_When_JoinGame_Then_ShouldReturnApiGame() throws XAndOGameError, ServiceException {
        givenNoErrorWhenJoinGame();
        ApiGame apiGame = sut.joinGame(PLAYER, API_GAME.getId());
        assertEquals(API_GAME, apiGame);
    }

    @Test
    void test_Given_AuthenticatedPrincipalIsNull_When_MakeMove_Then_ShouldThrowApiException() {
        givenAuthenticatedPrincipalIsNull();
        ApiException exception = assertThrows(ApiException.class, this::whenMakeMove);
        assertEquals(HttpStatus.FORBIDDEN, exception.getStatus());
    }

    @Test
    void test_Given_ExceptionIsThrown_When_MakeMove_Then_ShouldThrowApiException() throws XAndOGameError, ServiceException {
        givenErrorWhenMakeMove(PlayOutOfTurnException.class);
        ApiException exception = assertThrows(ApiException.class, this::whenMakeMove);
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    void test_Given_NoError_When_MakeMove_Then_ShouldReturnApiGame() throws XAndOGameError, ServiceException {
        givenNoErrorWhenMakeMove();
        whenMakeMove();
        assertEquals(API_GAME, response);
    }


}
