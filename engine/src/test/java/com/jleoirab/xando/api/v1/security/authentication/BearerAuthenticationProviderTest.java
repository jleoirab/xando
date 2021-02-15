package com.jleoirab.xando.api.v1.security.authentication;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * Created by jleoirab on 2021-02-15
 */
@ExtendWith(MockitoExtension.class)
class BearerAuthenticationProviderTest {
    // Static variable declaration

    // System under test
    private BearerAuthenticationProvider sut;

    // Collaborators
    @Mock
    private BearerTokenAuthenticator authenticator;

    // Helpers
    @BeforeEach
    void setup() {
        sut = new BearerAuthenticationProvider(authenticator);
    }

    @Test
    void test_Given_NonBearerAuthenticationToken_When_Supports_then_ShouldReturnFalse() {
        assertFalse(sut.supports(Authentication.class));
    }

    @Test
    void test_Given_BearerAuthenticationTokenClass_When_Supports_then_ShouldReturnTrue() {
        assertTrue(sut.supports(BearerAuthenticationToken.class));
    }

    @Test
    void test_Given_AuthenticationIsNotSupported_When_Authenticate_then_ShouldReturnNull() {
        assertNull(sut.authenticate(mock(Authentication.class)));
    }

    @Test
    void test_Given_AuthenticationIsAlreadyAuthenticated_When_Authenticate_then_ShouldReturnAuthentication() {
        BearerAuthenticationToken authentication = mock(BearerAuthenticationToken.class);
        when(authentication.isAuthenticated()).thenReturn(true);

        assertEquals(authentication, sut.authenticate(authentication));
        verify(authenticator, never()).authenticate(any());
    }

    @Test
    void test_Given_AuthenticationIsNotPreAuthenticationBearerAuthenticationTokenButIsSupported_When_Authenticate_then_ShouldReturnNull() {
        BearerAuthenticationToken authentication = mock(BearerAuthenticationToken.class);
        when(authentication.isAuthenticated()).thenReturn(false);

        assertNull(sut.authenticate(authentication));
    }

    @Test
    void test_Given_PreAuthenticationBearerAuthenticationToken_When_Authenticate_then_ShouldCallAuthenticator() {
        PreAuthenticatedBearerAuthenticationToken token = new PreAuthenticatedBearerAuthenticationToken("test", "test");
        sut.authenticate(token);
        verify(authenticator).authenticate(token);
    }

    @Test
    void test_Given_ExceptionInAuthenticator_When_Authenticate_then_ShouldReceiveTheException() {
        PreAuthenticatedBearerAuthenticationToken token = new PreAuthenticatedBearerAuthenticationToken("test", "test");
        when(authenticator.authenticate(token)).thenThrow(BadCredentialsException.class);
        assertThrows(BadCredentialsException.class, () -> sut.authenticate(token));
    }


}