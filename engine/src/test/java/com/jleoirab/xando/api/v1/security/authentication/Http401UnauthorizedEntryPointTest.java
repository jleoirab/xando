package com.jleoirab.xando.api.v1.security.authentication;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.AuthenticationException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static org.mockito.Mockito.verify;

/**
 * Created by jleoirab on 2021-02-15
 */
@ExtendWith(MockitoExtension.class)
class Http401UnauthorizedEntryPointTest {
    // Static variable declaration

    // System under test
    private Http401UnauthorizedEntryPoint sut;

    // Collaborators
    @Mock
    HttpServletRequest request;
    @Mock
    HttpServletResponse response;
    @Mock
    AuthenticationException authException;

    // Helpers
    @BeforeEach
    void setup() {
        sut = new Http401UnauthorizedEntryPoint();
    }

    @Test
    void test_When_Commence_Then_ShouldSetHeaders() throws IOException, ServletException {
        sut.commence(request, response, authException);
        verify(response).addHeader("WWW-Authenticate", Http401UnauthorizedEntryPoint.WWW_AUTHENTICATE_VALUE);
        verify(response).sendError(401, "Unauthorized");
    }


}