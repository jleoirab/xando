package com.jleoirab.xando.api.v1.security.authentication;

import org.springframework.security.core.AuthenticationException;

/**
 * Created by jleoirab on 2021-02-15
 */
public interface BearerTokenAuthenticator {
    AuthenticatedBearerAuthenticationToken authenticate(PreAuthenticatedBearerAuthenticationToken token) throws AuthenticationException;
}
