package com.jleoirab.xando.engine.api.v1.security.authentication;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Collections;

/**
 * Created by jleoirab on 2021-02-15
 */
public class PreAuthenticatedBearerAuthenticationToken implements BearerAuthenticationToken {
    private final String principal;
    private final String credentials;

    public PreAuthenticatedBearerAuthenticationToken(String principal, String credentials) {
        this.principal = principal;
        this.credentials = credentials;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
    }

    @Override
    public String getCredentials() {
        return credentials;
    }

    @Override
    public Object getDetails() {
        return getPrincipal();
    }

    @Override
    public String getPrincipal() {
        return principal;
    }

    @Override
    public boolean isAuthenticated() {
        return false;
    }

    @Override
    public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
        if (isAuthenticated) throw new IllegalArgumentException("This token cannot be authenticated");
    }

    @Override
    public String getName() {
        return getCredentials();
    }
}
