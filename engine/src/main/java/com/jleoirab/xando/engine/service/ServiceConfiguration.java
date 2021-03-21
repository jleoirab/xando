package com.jleoirab.xando.engine.service;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by jleoirab on 2021-03-21
 */
@Configuration
public class ServiceConfiguration {
    @Bean
    GameService gameService(@Qualifier("eventingGameService") GameService actual) {
        return actual;
    }

    @Bean
    PlayerService playerService(@Qualifier("playerServiceImpl") PlayerService actual) {
        return actual;
    }
}
