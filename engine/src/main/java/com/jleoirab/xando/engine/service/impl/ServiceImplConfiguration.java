package com.jleoirab.xando.engine.service.impl;

import com.jleoirab.xando.engine.repository.GameRepository;
import com.jleoirab.xando.engine.repository.PlayerRepository;
import com.jleoirab.xando.engine.service.GameService;
import com.jleoirab.xando.engine.service.PlayerService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by jleoirab on 2021-03-21
 */
@Configuration
public class ServiceImplConfiguration {

    @Bean
    GameService gameServiceImpl(@Qualifier("gameRepository") GameRepository gameRepository) {
        return new GameServiceImpl(gameRepository);
    }

    @Bean
    PlayerService playerServiceImpl(@Qualifier("playerRepository") PlayerRepository playerRepository) {
        return new PlayerServiceImpl(playerRepository);
    }
}
