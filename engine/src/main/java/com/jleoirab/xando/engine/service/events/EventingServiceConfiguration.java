package com.jleoirab.xando.engine.service.events;

import com.jleoirab.xando.engine.events.EventPublisher;
import com.jleoirab.xando.engine.service.GameService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by jleoirab on 2021-03-21
 */
@Configuration
public class EventingServiceConfiguration {
    @Bean
    GameService eventingGameService(@Qualifier("gameServiceImpl") GameService delegate, @Qualifier("eventPublisher") EventPublisher publisher) {
        return new PublishingGameService(delegate, publisher);
    }
}
