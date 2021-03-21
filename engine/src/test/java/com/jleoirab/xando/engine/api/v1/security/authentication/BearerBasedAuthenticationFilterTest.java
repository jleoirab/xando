package com.jleoirab.xando.engine.api.v1.security.authentication;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/** Created by jleoirab on 2021-02-13 */
@ExtendWith(MockitoExtension.class)
class BearerBasedAuthenticationFilterTest {
    // Static variable declaration
    private static final String BASIC_AUTH_HEADER_VALUE = "Basic username:password";
    private static final String BEARER_AUTH_HEADER_VALUE = "Bearer playerName:playerId";

    // System under test
    private BearerBasedAuthenticationFilter sut;

    // Collaborators
    @Mock private HttpServletRequest request;
    @Mock private HttpServletResponse response;
    @Mock private FilterChain filterChain;
    @Mock private SecurityContext securityContext;

    private Authentication authentication;
    @Mock private BearerAuthenticationTokenFactory authenticationTokenFactory;

    // Helpers
    @BeforeEach
    void setup() {
        SecurityContextHolder.setContext(securityContext);

        sut = new BearerBasedAuthenticationFilter(authenticationTokenFactory);
    }

    private void givenAuthHeaderIs(String authHeaderValue) {
        when(request.getHeader(BearerBasedAuthenticationFilter.AUTHORIZATION_HEADER))
                .thenReturn(authHeaderValue);
    }

    private void givenBasicAuthHeader() {
        givenAuthHeaderIs(BASIC_AUTH_HEADER_VALUE);
    }

    private void givenAuthenticationTokenFactoryReturnsNull() {
        givenAuthHeaderIs(BEARER_AUTH_HEADER_VALUE);
    }

    private void givenValidBearerToken() {
        doAnswer(i -> authentication = i.getArgument(0, Authentication.class))
                .when(securityContext)
                .setAuthentication(any());

        givenAuthHeaderIs(BEARER_AUTH_HEADER_VALUE);
        when(authenticationTokenFactory.from(anyString())).thenReturn(mock(BearerAuthenticationToken.class));
    }

    private void whenDoFilterInternal() throws ServletException, IOException {
        sut.doFilterInternal(request, response, filterChain);
    }

    private void thenShouldNotSetSecurityContextAuthenticated() {
        assertNull(authentication);
    }

    private void thenShouldNotHaveAuthenticationInContext() {
        assertNull(authentication);
    }

    private void thenShouldSetAuthenticationOnSecurityContext() {
        assertNotNull(authentication);
        assertFalse(authentication.isAuthenticated());
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
            test_Given_AuthenticationTokenFactoryReturnsNull_When_DoFilterInternal_then_ShouldClearSecurityContext()
                    throws ServletException, IOException {
        givenAuthenticationTokenFactoryReturnsNull();
        whenDoFilterInternal();
        thenShouldNotHaveAuthenticationInContext();
        thenShouldContinueFilterChain();
    }

    @Test
    void
            test_Given_ValidBearerTokenHeader_When_DoFilterInternal_then_ShouldSetAuthenticationOnSecurityContext()
                    throws ServletException, IOException {
        givenValidBearerToken();
        whenDoFilterInternal();
        thenShouldSetAuthenticationOnSecurityContext();
        thenShouldContinueFilterChain();
    }
}
