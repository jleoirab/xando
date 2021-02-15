package com.jleoirab.xando.api.v1.security.authentication.simplebearer;

import com.jleoirab.xando.api.v1.security.authentication.AuthenticatedBearerAuthenticationToken;
import com.jleoirab.xando.api.v1.security.authentication.BearerTokenAuthenticator;
import com.jleoirab.xando.api.v1.security.authentication.PreAuthenticatedBearerAuthenticationToken;
import com.jleoirab.xando.domain.Player;
import com.jleoirab.xando.service.PlayerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Created by jleoirab on 2021-02-15
 */
public class SimpleBearerTokenAuthenticator implements BearerTokenAuthenticator {
    private static final Logger LOG = LoggerFactory.getLogger(SimpleBearerTokenAuthenticator.class);

    private final PlayerService playerService;

    public SimpleBearerTokenAuthenticator(PlayerService playerService) {
        this.playerService = checkNotNull(playerService, "playerService is null in SimpleBearerTokenAuthenticator#SimpleBearerTokenAuthenticator");
    }

    @Override
    public AuthenticatedBearerAuthenticationToken authenticate(PreAuthenticatedBearerAuthenticationToken token) throws AuthenticationException {
        String bearerToken = token.getCredentials();
        String[] parts = bearerToken.split(":");

        if (parts.length != 2) {
            throw new BadCredentialsException("Invalid credentials passed");
        }

        try {
            Player player = playerService.getPlayer(parts[1], parts[0]);
            return AuthenticatedBearerAuthenticationToken.from(player, bearerToken);
        } catch (Exception e) {
            String errorMessage = String.format("token %s is invalid. It does not belong to valid player", bearerToken);
            LOG.error(errorMessage, e);
            throw new BadCredentialsException(errorMessage);
        }
    }
}
