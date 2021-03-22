package com.jleoirab.xando.router.events;

import com.jleoirab.xando.router.RouterService;
import com.jleoirab.xando.router.events.impl.DefaultEventSubscriber;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by jleoirab on 2021-03-21
 */
@Configuration
public class EventsConfiguration {
    @Bean
    EventSubscriber eventSubscriber(@Qualifier("routerService") RouterService routerService) {
        return new DefaultEventSubscriber(routerService);
    }
}
