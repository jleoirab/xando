package com.jleoirab.xando.api.v1.security;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.jleoirab.xando.service.PlayerService;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

/** Created by jleoirab on 2021-02-13 */
@ExtendWith(MockitoExtension.class)
class TokenBasedAuthenticationFilterTest {
    // Static variable declaration
    private static final String BASIC_AUTH_HEADER_VALUE = "Basic username:password";
    private static final String MALFORMED_BEARER_AUTH_HEADER_VALUE = "Bearer but this is malformed";
    private static final String BEARER_AUTH_HEADER_EMPTY_PLAYER_NAME = "Bearer :playerId";
    private static final String BEARER_AUTH_HEADER_EMPTY_PLAYER_ID = "Bearer playerName:";
    private static final String BEARER_AUTH_HEADER_VALUE = "Bearer playerName:playerId";

    // System under test
    private TokenBasedAuthenticationFilter sut;

    // Collaborators
    @Mock private PlayerService playerService;
    @Mock private HttpServletRequest request;
    @Mock private HttpServletResponse response;
    @Mock private FilterChain filterChain;
    @Mock private SecurityContext securityContext;

    private Authentication authentication;

    // Helpers
    @BeforeEach
    void setup() {
        SecurityContextHolder.setContext(securityContext);

        sut = new TokenBasedAuthenticationFilter(playerService);
    }

    private void givenAuthHeaderIs(String authHeaderValue) {
        when(request.getHeader(TokenBasedAuthenticationFilter.AUTHORIZATION_HEADER))
                .thenReturn(authHeaderValue);
    }

    private void givenBasicAuthHeader() {
        givenAuthHeaderIs(BASIC_AUTH_HEADER_VALUE);
    }

    private void givenBearerTokenHeaderIsMalformed() {
        givenAuthHeaderIs(MALFORMED_BEARER_AUTH_HEADER_VALUE);
    }

    private void givenBearerTokenPlayerIdIsEmpty() {
        givenAuthHeaderIs(BEARER_AUTH_HEADER_EMPTY_PLAYER_ID);
    }

    private void givenBearerTokenPlayerNameIsEmpty() {
        givenAuthHeaderIs(BEARER_AUTH_HEADER_EMPTY_PLAYER_NAME);
    }

    private void givenValidBearerToken() {
        doAnswer(i -> authentication = i.getArgument(0, Authentication.class))
                .when(securityContext)
                .setAuthentication(any());

        givenAuthHeaderIs(BEARER_AUTH_HEADER_VALUE);
    }

    private void whenDoFilterInternal() throws ServletException, IOException {
        sut.doFilterInternal(request, response, filterChain);
    }

    private void thenShouldNotSetSecurityContextAuthenticated() {
        assertNull(authentication);
    }

    private void thenShouldClearSecurityContext() {
        assertNotEquals(securityContext, SecurityContextHolder.getContext());
    }

    private void thenShouldSetSecurityContextAuthenticated() {
        assertNotNull(authentication);
        assertTrue(authentication.isAuthenticated());
    }

    private void thenShouldContinueFilterChain() throws IOException, ServletException {
        verify(filterChain).doFilter(request, response);
    }

    @Test
    void
            test_Given_NoBearerTokenHeader_When_DoFilterInternal_then_ShouldNotSetSecurityContextAuthenticated()
                    throws ServletException, IOException {
        whenDoFilterInternal();
        thenShouldNotSetSecurityContextAuthenticated();
        thenShouldContinueFilterChain();
    }

    @Test
    void
            test_Given_BasicAuthHeader_When_DoFilterInternal_then_ShouldNotSetSecurityContextAuthenticated()
                    throws ServletException, IOException {
        givenBasicAuthHeader();
        whenDoFilterInternal();
        thenShouldNotSetSecurityContextAuthenticated();
        thenShouldContinueFilterChain();
    }

    @Test
    void
            test_Given_BearerTokenHeaderIsMalformed_When_DoFilterInternal_then_ShouldClearSecurityContext()
                    throws ServletException, IOException {
        givenBearerTokenHeaderIsMalformed();
        whenDoFilterInternal();
        thenShouldClearSecurityContext();
        thenShouldContinueFilterChain();
    }

    @Test
    void
            test_Given_BearerTokenHeaderHasEmptyPlayerId_When_DoFilterInternal_then_ShouldClearSecurityContext()
                    throws ServletException, IOException {
        givenBearerTokenPlayerIdIsEmpty();
        whenDoFilterInternal();
        thenShouldClearSecurityContext();
        thenShouldContinueFilterChain();
    }

    @Test
    void
            test_Given_BearerTokenHeaderHasEmptyPlayerName_When_DoFilterInternal_then_ShouldClearSecurityContext()
                    throws ServletException, IOException {
        givenBearerTokenPlayerNameIsEmpty();
        whenDoFilterInternal();
        thenShouldClearSecurityContext();
        thenShouldContinueFilterChain();
    }

    @Test
    void
            test_Given_ValidBearerTokenHeader_When_DoFilterInternal_then_ShouldSetAuthenticatedSecurityContext()
                    throws ServletException, IOException {
        givenValidBearerToken();
        whenDoFilterInternal();
        thenShouldSetSecurityContextAuthenticated();
        thenShouldContinueFilterChain();
    }
}
