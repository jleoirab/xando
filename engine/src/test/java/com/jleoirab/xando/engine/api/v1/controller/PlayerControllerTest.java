package com.jleoirab.xando.engine.api.v1.controller;

import com.jleoirab.xando.engine.api.v1.request.CreatePlayerRequest;
import com.jleoirab.xando.engine.api.v1.resources.ApiPlayer;
import com.jleoirab.xando.engine.domain.model.Player;
import com.jleoirab.xando.engine.service.PlayerService;
import com.jleoirab.xando.engine.service.errors.PlayerCreationException;
import com.jleoirab.xando.engine.service.errors.ServiceException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

/** Created by jleoirab on 2021-02-12 */
@ExtendWith(MockitoExtension.class)
class PlayerControllerTest {
    // Static variable declaration
    private static final ApiPlayer API_PLAYER =
            ApiPlayer.builder().id("player-id").playerName("playerName").build();

    // System under test
    private PlayerController sut;

    // Collaborators
    @Mock private PlayerService playerService;
    private ApiPlayer createPlayerResponse;

    // Helpers
    @BeforeEach
    void setup() {
        sut = new PlayerController(playerService);
    }

    private void givenNoErrorInPlayerCreation() throws ServiceException {
        when(playerService.createPlayer(API_PLAYER.getPlayerName()))
                .thenReturn(
                        Player.builder()
                                .playerId(API_PLAYER.getId())
                                .playerName(API_PLAYER.getPlayerName())
                                .build());
    }

    private void givenErrorInPlayerCreation() throws ServiceException {
        when(playerService.createPlayer(API_PLAYER.getPlayerName()))
                .thenThrow(PlayerCreationException.class);
    }

    private void whenCreatePlayer() {
        CreatePlayerRequest request =
                CreatePlayerRequest.builder().playerName(API_PLAYER.getPlayerName()).build();

        createPlayerResponse = sut.createPlayer(request);
    }

    private void thenShouldReturnApiPlayer() {
        assertEquals(API_PLAYER, createPlayerResponse);
    }

    @Test
    void test_Given_NoErrorInPlayerCreation_When_CreatePlayer_then_ShouldReturnApiPlayer()
            throws ServiceException {
        givenNoErrorInPlayerCreation();
        whenCreatePlayer();
        thenShouldReturnApiPlayer();
    }

    @Test
    void test_Given_ErrorInPlayerCreation_When_CreatePlayer_then_ShouldThrowApiException()
            throws ServiceException {
        givenErrorInPlayerCreation();
        ApiException exception = assertThrows(ApiException.class, this::whenCreatePlayer);
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }
}
