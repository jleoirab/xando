package com.jleoirab.xando.engine.api.v1.security.authentication;

import com.jleoirab.xando.engine.domain.model.Player;
import org.apache.logging.log4j.util.Strings;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Collections;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Created by jleoirab on 2021-02-15
 */
public class AuthenticatedBearerAuthenticationToken implements BearerAuthenticationToken {
    private final Player player;
    private final String token;

    public static AuthenticatedBearerAuthenticationToken from(Player player, String token) {
        return new AuthenticatedBearerAuthenticationToken(player, token);
    }

    private AuthenticatedBearerAuthenticationToken(Player player, String token) {
        this.player = checkNotNull(player, "player is null in AuthenticatedBearerAuthenticationToken#AuthenticatedBearerAuthenticationToken");
        checkArgument(Strings.isNotBlank(token), "token is blank in AuthenticatedBearerAuthenticationToken#AuthenticatedBearerAuthenticationToken");
        this.token = token;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
    }

    @Override
    public Object getCredentials() {
        return token;
    }

    @Override
    public Object getDetails() {
        return getPrincipal();
    }

    @Override
    public Object getPrincipal() {
        return player;
    }

    @Override
    public boolean isAuthenticated() {
        return true;
    }

    @Override
    public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
        if (!isAuthenticated) throw new IllegalArgumentException("Cannot de-authenticate authenticated bearer authentication token");
    }

    @Override
    public String getName() {
        return player.getPlayerName();
    }
}
