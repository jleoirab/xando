package com.jleoirab.xando.api.v1.controller;

import com.jleoirab.xando.api.v1.request.CreateGameRequest;
import com.jleoirab.xando.api.v1.resources.ApiGame;
import com.jleoirab.xando.domain.model.Game;
import com.jleoirab.xando.domain.model.Player;
import com.jleoirab.xando.service.GameService;
import com.jleoirab.xando.service.errors.GameCreationException;
import com.jleoirab.xando.service.errors.ServiceException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
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


    private GameController sut;

    @Mock private GameService gameService;
    private ApiGame createGameResponse;
    private Player authenticatedPrincipal;

    @BeforeEach
    void setup() {
        authenticatedPrincipal = PLAYER;
        sut = new GameController(gameService);
    }

    private void givenNoErrorInCreation() throws ServiceException {
        when(gameService.createGame(any()))
                .thenReturn(
                        Game.builder()
                                .gameId(API_GAME.getId())
                                .gameCreatorPlayerId(PLAYER.getPlayerId())
                                .gameBoard(API_GAME.getGameBoard())
                                .build());
    }

    private void givenErrorInCreation() throws ServiceException {
        when(gameService.createGame(any())).thenThrow(GameCreationException.class);
    }

    private void givenAuthenticatedPrincipalIsNull() {
        authenticatedPrincipal = null;
    }

    private void whenCreateGame() {
        CreateGameRequest createGameRequest = CreateGameRequest.builder().build();

        createGameResponse = sut.createGame(authenticatedPrincipal, createGameRequest);
    }

    private void thenShouldReturnApiGame() {
        assertEquals(API_GAME, createGameResponse);
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

}
