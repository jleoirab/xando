package com.jleoirab.xando.engine.api.v1.security.authentication.simplebearer;

import com.jleoirab.xando.engine.api.v1.security.authentication.BearerAuthenticationToken;
import com.jleoirab.xando.engine.api.v1.security.authentication.BearerAuthenticationTokenFactory;
import com.jleoirab.xando.engine.api.v1.security.authentication.PreAuthenticatedBearerAuthenticationToken;
import org.apache.logging.log4j.util.Strings;

import javax.annotation.Nullable;

/**
 * Created by jleoirab on 2021-02-15
 */
public class SimpleAuthenticationTokenFactory implements BearerAuthenticationTokenFactory {
    @Nullable
    @Override
    public BearerAuthenticationToken from(String bearerToken) {
        if (Strings.isBlank(bearerToken)) {
            return null;
        }

        String[] parts = bearerToken.split(":");

        if (parts.length != 2 || Strings.isBlank(parts[0]) || Strings.isBlank(parts[1])) {
            return null;
        }

        return new PreAuthenticatedBearerAuthenticationToken(parts[1], bearerToken);
    }
}
