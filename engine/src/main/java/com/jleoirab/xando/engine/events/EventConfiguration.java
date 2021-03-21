package com.jleoirab.xando.engine.events;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by jleoirab on 2021-03-21
 */
@Configuration
public class EventConfiguration {
    @Bean
    EventPublisher eventPublisher(@Qualifier("rabbitMQEventPublisher") EventPublisher publisher) {
        return publisher;
    }
}
