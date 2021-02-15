package com.jleoirab.xando.service.impl;

import static org.junit.jupiter.api.Assertions.*;

import com.jleoirab.xando.domain.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/** Created by jleoirab on 2021-02-12 */
class GameServiceImplTest {
    // Static variable declaration
    private final Player PLAYER_X = Player.builder().playerId("player-id").playerName("player-x").build();

    // System under test
    private GameServiceImpl sut;

    // Collaborators

    // Helpers
    @BeforeEach
    void setup() {
        sut = new GameServiceImpl();
    }

    @Test
    void test_Given_Player_When_CreateGame_then_ShouldCreateGame() {
        Game game = sut.createGame(PLAYER_X);

        assertNotNull(game.getGameId());
        assertEquals(GamePlayer.from(PLAYER_X), game.getPlayerX());
        assertNull(game.getPlayerO());
        assertEquals(",,,,,,,,", game.getGameBoard());
        assertEquals(PlayerTag.PLAYER_X, game.getGameStatus().getCurrentPlayerTurn());
        assertNull(game.getGameStatus().getWinner());
        assertEquals(GameState.CREATED, game.getGameStatus().getState());
    }
}
