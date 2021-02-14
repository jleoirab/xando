package com.jleoirab.xando.api.v1.security;

import static com.google.common.base.Preconditions.checkNotNull;

import com.google.common.annotations.VisibleForTesting;
import com.jleoirab.xando.domain.Player;
import com.jleoirab.xando.service.PlayerService;
import java.io.IOException;
import java.util.Collections;
import java.util.Optional;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.logging.log4j.util.Strings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

/** Created by jleoirab on 2021-02-13 */
public class TokenBasedAuthenticationFilter extends OncePerRequestFilter {
    private static final Logger LOG = LoggerFactory.getLogger(TokenBasedAuthenticationFilter.class);

    @VisibleForTesting static final String AUTHORIZATION_HEADER = "Authorization";

    private final PlayerService playerService;

    TokenBasedAuthenticationFilter(PlayerService playerService) {
        this.playerService =
                checkNotNull(playerService, "playerDetailsService is null in methodName()");
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        Optional<String> tokenOptional = parseToken(request);

        if (tokenOptional.isEmpty()) {
            LOG.trace("No auth token provided. Will not authenticate.");
            filterChain.doFilter(request, response);
            return;
        }

        String token = tokenOptional.get();
        String[] parts = token.split(":");

        if (parts.length != 2 || Strings.isBlank(parts[0]) || Strings.isBlank(parts[1])) {
            LOG.error("Invalid Bearer token provided. Failed authentication");
            SecurityContextHolder.clearContext();
            filterChain.doFilter(request, response);
            return;
        }

        Player player = playerService.getPlayer(parts[1], parts[0]);

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(player, token, Collections.emptyList());

        SecurityContextHolder.getContext().setAuthentication(authenticationToken);

        filterChain.doFilter(request, response);
    }

    private Optional<String> parseToken(HttpServletRequest request) {
        return Optional.ofNullable(request.getHeader(AUTHORIZATION_HEADER)).map(this::parseToken);
    }

    private String parseToken(String authHeaderValue) {
        if (!authHeaderValue.startsWith("Bearer ")) {
            return null;
        }

        return authHeaderValue.substring(7);
    }
}
