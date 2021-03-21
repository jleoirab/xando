package com.jleoirab.xando.engine.repository;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by jleoirab on 2021-03-21
 */
@Configuration
class RepositoryConfiguration {

    @Bean
    GameRepository gameRepository(@Qualifier("mongoDBGameRepository") GameRepository gameRepository) {
        return gameRepository;
    }

    @Bean
    PlayerRepository playerRepository(@Qualifier("mongoDBPlayerRepository") PlayerRepository playerRepository) {
        return playerRepository;
    }
}
