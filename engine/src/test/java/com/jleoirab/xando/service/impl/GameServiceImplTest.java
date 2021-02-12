package com.jleoirab.xando.service.impl;

import static org.junit.jupiter.api.Assertions.*;

import com.jleoirab.xando.domain.Game;
import com.jleoirab.xando.domain.Player;
import com.jleoirab.xando.domain.PlayerTag;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/** Created by jleoirab on 2021-02-12 */
class GameServiceImplTest {
    // Static variable declaration
    private final Player PLAYER_X = Player.builder().id("player-id").playerName("player-x").build();

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

        assertNotNull(game.getId());
        assertEquals(PLAYER_X, game.getPlayerX());
        assertNull(game.getPlayerO());
        assertEquals(",,,,,,,,", game.getGameBoard());
        assertEquals(PlayerTag.PLAYER_X, game.getGameStatus().getCurrentPlayerTurn());
        assertNull(game.getGameStatus().getWinner());
        assertFalse(game.getGameStatus().isFinished());
    }
}
