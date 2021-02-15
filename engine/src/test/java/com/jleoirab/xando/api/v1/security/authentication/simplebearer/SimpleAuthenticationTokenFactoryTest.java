package com.jleoirab.xando.api.v1.security.authentication.simplebearer;

import com.jleoirab.xando.api.v1.security.authentication.BearerAuthenticationToken;
import com.jleoirab.xando.domain.Player;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

/**
 * Created by jleoirab on 2021-02-15
 */
class SimpleAuthenticationTokenFactoryTest {
    // Static variable declaration
    private static final String PLAYER_NAME = "playerName";
    private static final String PLAYER_ID = "playerId";
    private static final String VALID_TOKEN = String.format("%s:%s", PLAYER_NAME, PLAYER_ID);
    private static final String INVALID_TOKEN = "invalid token";
    private static final String MISSING_PLAYER_NAME_TOKEN = String.format("%s:%s", "", PLAYER_ID);
    private static final String MISSING_PLAYER_ID_TOKEN = String.format("%s:%s", PLAYER_NAME, "");

    // System under test
    private SimpleAuthenticationTokenFactory sut;
    private String token;
    private BearerAuthenticationToken authentication;

    // Collaborators

    // Helpers
    @BeforeEach
    void setup() {
        sut = new SimpleAuthenticationTokenFactory();
    }


    private void givenToken(String token) {
        this.token = token;
    }

    private void whenFrom() {
        authentication = sut.from(token);
    }

    private void thenShouldReturnValidAuthentication() {
        Player player = (Player) authentication.getPrincipal();
        assertEquals(token, authentication.getCredentials().toString());
        assertEquals(PLAYER_ID, player.getId());
        assertEquals(PLAYER_NAME, player.getPlayerName());
    }

    private void testInvalidToken(String token) {
        givenToken(token);
        whenFrom();
        assertNull(authentication);
    }

    @Test
    void test_Given_ValidToken_When_From_then_ShouldReturnToken() {
        givenToken(VALID_TOKEN);
        whenFrom();
        thenShouldReturnValidAuthentication();
    }

    @Test
    void test_Given_InvalidToken_When_From_then_ShouldReturnNull() {
        testInvalidToken(INVALID_TOKEN);
        testInvalidToken(MISSING_PLAYER_NAME_TOKEN);
        testInvalidToken(MISSING_PLAYER_ID_TOKEN);
    }


}