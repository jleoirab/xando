package com.jleoirab.xando.router.websocket;

import com.jleoirab.xando.router.websocket.impl.WebSocketServiceImpl;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * Created by jleoirab on 2021-03-21
 */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer {
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOrigins("*");
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/queue");
        registry.setApplicationDestinationPrefixes("/v1/");
    }

    @Bean
    SimpMessagingTemplate messagingTemplate(/* This is gotten directly from spring boot web socket */ SimpMessagingTemplate simpMessagingTemplate) {
        simpMessagingTemplate.setMessageConverter(new ProtobufMessageConverter());
        return simpMessagingTemplate;
    }

    @Bean
    WebSocketService webSocketService(@Qualifier("messagingTemplate") SimpMessagingTemplate template) {
        return new WebSocketServiceImpl(template);
    }
}
