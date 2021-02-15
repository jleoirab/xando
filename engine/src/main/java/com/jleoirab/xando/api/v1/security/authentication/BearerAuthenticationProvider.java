package com.jleoirab.xando.api.v1.security.authentication;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Created by jleoirab on 2021-02-15
 */
public class BearerAuthenticationProvider implements AuthenticationProvider {
    private final BearerTokenAuthenticator authenticator;

    public BearerAuthenticationProvider(BearerTokenAuthenticator authenticator) {
        this.authenticator = checkNotNull(authenticator, "authenticator is null in BearerAuthenticationProvider#BearerAuthenticationProvider");
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        if (!supports(authentication.getClass())) {
            return null;
        }

        if (authentication.isAuthenticated()) {
            return authentication;
        }

        if (authentication instanceof PreAuthenticatedBearerAuthenticationToken) {
            return authenticator.authenticate((PreAuthenticatedBearerAuthenticationToken) authentication);
        }

        return null;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return BearerAuthenticationToken.class.isAssignableFrom(authentication);
    }
}
