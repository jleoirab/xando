package com.jleoirab.xando.api.v1.security;

import com.jleoirab.xando.service.PlayerService;
import javax.servlet.Filter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/** Created by jleoirab on 2021-02-13 */
@Configuration
public class SecurityDependencyConfiguration {
    @Bean
    public Filter tokenBasedAuthenticationFilter(PlayerService playerService) {
        return new TokenBasedAuthenticationFilter(playerService);
    }
}
