package com.jleoirab.xando.engine.api.v1.security.authentication;

import com.google.common.annotations.VisibleForTesting;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

import static com.google.common.base.Preconditions.checkNotNull;

/** Created by jleoirab on 2021-02-13 */
public class BearerBasedAuthenticationFilter extends OncePerRequestFilter {
    @VisibleForTesting static final String AUTHORIZATION_HEADER = "Authorization";

    private final BearerAuthenticationTokenFactory authenticationTokenFactory;

    public BearerBasedAuthenticationFilter(BearerAuthenticationTokenFactory authenticationTokenFactory) {
        this.authenticationTokenFactory = checkNotNull(authenticationTokenFactory, "authenticationTokenFactory is null in BearerBasedAuthenticationFilter#BearerBasedAuthenticationFilter");
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        parseToken(request)
                .map(authenticationTokenFactory::from)
                .ifPresent(SecurityContextHolder.getContext()::setAuthentication);

        filterChain.doFilter(request, response);
    }

    private Optional<String> parseToken(HttpServletRequest request) {
        return Optional.ofNullable(request.getHeader(AUTHORIZATION_HEADER))
                .map(this::parseToken);
    }

    private String parseToken(String authHeaderValue) {
        if (!authHeaderValue.toLowerCase().startsWith("bearer ")) {
            return null;
        }

        return authHeaderValue.substring(7).trim();
    }
}
