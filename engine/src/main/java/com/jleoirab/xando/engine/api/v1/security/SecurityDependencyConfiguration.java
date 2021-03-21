package com.jleoirab.xando.engine.api.v1.security;

import com.jleoirab.xando.engine.api.v1.security.authentication.BearerAuthenticationProvider;
import com.jleoirab.xando.engine.api.v1.security.authentication.BearerAuthenticationTokenFactory;
import com.jleoirab.xando.engine.api.v1.security.authentication.BearerBasedAuthenticationFilter;
import com.jleoirab.xando.engine.api.v1.security.authentication.BearerTokenAuthenticator;
import com.jleoirab.xando.engine.api.v1.security.authentication.simplebearer.SimpleAuthenticationTokenFactory;
import com.jleoirab.xando.engine.api.v1.security.authentication.simplebearer.SimpleBearerTokenAuthenticator;
import com.jleoirab.xando.engine.service.PlayerService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;

import javax.servlet.Filter;

/** Created by jleoirab on 2021-02-13 */
@Configuration
public class SecurityDependencyConfiguration {
    @Bean
    public BearerAuthenticationTokenFactory bearerAuthenticationTokenFactory() {
        return new SimpleAuthenticationTokenFactory();

    }
    @Bean
    public Filter tokenBasedAuthenticationFilter(BearerAuthenticationTokenFactory bearerAuthenticationTokenFactory) {
        return new BearerBasedAuthenticationFilter(bearerAuthenticationTokenFactory);
    }

    @Bean
    public BearerTokenAuthenticator bearerTokenAuthenticator(PlayerService playerService) {
        return new SimpleBearerTokenAuthenticator(playerService);
    }

    @Bean
    public AuthenticationProvider authenticationProvider(BearerTokenAuthenticator bearerTokenAuthenticator) {
        return new BearerAuthenticationProvider(bearerTokenAuthenticator);
    }
}
