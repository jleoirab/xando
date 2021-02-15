package com.jleoirab.xando.api.v1.security.authentication;

import com.google.common.annotations.VisibleForTesting;
import org.springframework.http.HttpHeaders;
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
    @VisibleForTesting static final HttpStatus STATUS = HttpStatus.UNAUTHORIZED;
    @VisibleForTesting static final String WWW_AUTHENTICATE_VALUE = "Bearer error=\"Invalid access token\"";

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        response.addHeader(HttpHeaders.WWW_AUTHENTICATE, WWW_AUTHENTICATE_VALUE);
        response.sendError(STATUS.value(), STATUS.getReasonPhrase());
    }
}
