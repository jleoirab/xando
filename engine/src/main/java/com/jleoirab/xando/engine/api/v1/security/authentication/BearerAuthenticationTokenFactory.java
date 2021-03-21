package com.jleoirab.xando.engine.api.v1.security.authentication;

import javax.annotation.Nullable;

/**
 * Created by jleoirab on 2021-02-15
 */
public interface BearerAuthenticationTokenFactory {
    @Nullable BearerAuthenticationToken from(String bearerToken);
}
