package com.jleoirab.xando.domain;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

/** Created by jleoirab on 2021-02-12 */
class PlayerTagTest {
    // Static variable declaration

    // System under test
    PlayerTag playerTag;

    // Collaborators

    // Helpers

    @Test
    void test_Given_PlayerX_When_Opponent_then_ShouldReturnPlayerO() {
        playerTag = PlayerTag.PLAYER_X;
        assertEquals(PlayerTag.PLAYER_O, playerTag.opponent());
    }

    @Test
    void test_Given_PlayerO_When_Opponent_then_ShouldReturnPlayerX() {
        playerTag = PlayerTag.PLAYER_O;
        assertEquals(PlayerTag.PLAYER_X, playerTag.opponent());
    }

    @Test
    void test_Given_XValue_When_From_then_ShouldReturnPlayerX() {
        assertEquals(PlayerTag.PLAYER_X, PlayerTag.from("X"));
    }

    @Test
    void test_Given_OValue_When_From_then_ShouldReturnPlayerO() {
        assertEquals(PlayerTag.PLAYER_O, PlayerTag.from("O"));
    }

    @Test
    void test_Given_InvalidValue_When_From_then_ShouldReturnPlayerO() {
        assertThrows(IllegalArgumentException.class, () -> PlayerTag.from("A"));
    }
}
