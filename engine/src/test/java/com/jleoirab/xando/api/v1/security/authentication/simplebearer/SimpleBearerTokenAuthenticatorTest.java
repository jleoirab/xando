package com.jleoirab.xando.api.v1.security.authentication.simplebearer;

import com.jleoirab.xando.api.v1.security.authentication.AuthenticatedBearerAuthenticationToken;
import com.jleoirab.xando.api.v1.security.authentication.PreAuthenticatedBearerAuthenticationToken;
import com.jleoirab.xando.domain.Player;
import com.jleoirab.xando.service.PlayerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.BadCredentialsException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

/**
 * Created by jleoirab on 2021-02-15
 */
@ExtendWith(MockitoExtension.class)
class SimpleBearerTokenAuthenticatorTest {
    // Static variable declaration
    public static final String PLAYER_ID = "player-id";
    public static final String PLAYER_NAME = "player-name";

    private static final Player PLAYER = Player.builder()
            .playerId(PLAYER_ID)
            .playerName(PLAYER_NAME)
            .build();

    private static final String TOKEN = String.format("%s:%s", PLAYER_NAME, PLAYER_ID);
    private static final String INVALID_TOKEN = "invalid token";

    // System under test
    private SimpleBearerTokenAuthenticator sut;

    // Collaborators
    @Mock
    private PlayerService playerService;
    private PreAuthenticatedBearerAuthenticationToken token;
    private AuthenticatedBearerAuthenticationToken authenticatedToken;

    // Helpers
    @BeforeEach
    void setup() {
        sut = new SimpleBearerTokenAuthenticator(playerService);
    }

    private void givenToken(String bearerToken) {
        token = new PreAuthenticatedBearerAuthenticationToken(null, bearerToken);
    }

    private void givenPlayerServiceThrowsAnException() {
        when(playerService.getPlayer(PLAYER_ID, PLAYER_NAME)).thenThrow(NullPointerException.class);
    }

    private void givenPlayerServiceReturnsPlayer() {
        when(playerService.getPlayer(PLAYER_ID, PLAYER_NAME)).thenReturn(PLAYER);
    }

    private void whenAuthenticate() {
        authenticatedToken = sut.authenticate(token);
    }

    private void thenShouldReturnValidAuthenticatedToken() {
        assertEquals(PLAYER, authenticatedToken.getPrincipal());
        assertEquals(TOKEN, authenticatedToken.getCredentials());
    }

    @Test
    void test_Given_InvalidBearerToken_When_Authenticate_Then_ShouldThrowBadCredentialsException() {
        givenToken(INVALID_TOKEN);
        assertThrows(BadCredentialsException.class, this::whenAuthenticate);
    }

    @Test
    void test_Given_PlayerServiceThrowsException_When_Authenticate_Then_ShouldThrowBadCredentialsException() {
        givenToken(TOKEN);
        givenPlayerServiceThrowsAnException();
        assertThrows(BadCredentialsException.class, this::whenAuthenticate);
    }

    @Test
    void test_Given_PlayerService_When_Authenticate_Then_ShouldReturnValidAuthenticatedToken() {
        givenToken(TOKEN);
        givenPlayerServiceReturnsPlayer();
        whenAuthenticate();
        thenShouldReturnValidAuthenticatedToken();
    }


}