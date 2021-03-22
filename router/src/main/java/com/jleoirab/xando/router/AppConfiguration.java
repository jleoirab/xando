package com.jleoirab.xando.router;

import com.jleoirab.xando.router.websocket.WebSocketService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by jleoirab on 2021-03-21
 */
@Configuration
public class AppConfiguration {
    @Bean
    RouterService routerService(@Qualifier("webSocketService") WebSocketService webSocketService) {
        return new DefaultRouterService(webSocketService);
    }
}
