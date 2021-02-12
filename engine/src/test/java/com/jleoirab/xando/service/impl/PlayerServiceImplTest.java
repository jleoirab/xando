package com.jleoirab.xando.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.jleoirab.xando.domain.Player;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/** Created by jleoirab on 2021-02-12 */
class PlayerServiceImplTest {
    // Static variable declaration
    private static final String PLAYER_NAME = "player-name";

    // System under test
    private PlayerServiceImpl sut;

    // Collaborators

    // Helpers
    @BeforeEach
    void setup() {
        sut = new PlayerServiceImpl();
    }

    @Test
    void test_Given_Player_When_CreateGame_then_ShouldCreateGame() {
        Player player = sut.createPlayer(PLAYER_NAME);

        assertNotNull(player.getId());
        assertEquals(PLAYER_NAME, player.getPlayerName());
    }
}
