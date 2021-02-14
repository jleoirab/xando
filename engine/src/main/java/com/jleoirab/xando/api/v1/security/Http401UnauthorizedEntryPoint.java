package com.jleoirab.xando.api.v1.security;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by jleoirab on 2021-02-14
 */
public class Http401UnauthorizedEntryPoint implements AuthenticationEntryPoint {
    private static final HttpStatus STATUS = HttpStatus.UNAUTHORIZED;
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        response.sendError(STATUS.value(), STATUS.getReasonPhrase());
    }
}
