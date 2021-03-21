package com.jleoirab.xando.router.eventsource.rabbitmq;

import com.jleoirab.xando.router.events.EventSubscriber;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by jleoirab on 2021-03-21
 */
@Configuration
public class RabbitMQConfiguration {
    private static final String QUEUE_NAME = "event-queue";
    private static final String RABBITMQ_USERNAME = "xando-router";

    @Bean
    CachingConnectionFactory connectionFactory() {
        CachingConnectionFactory factory = new CachingConnectionFactory("localhost");
        factory.setUsername(RABBITMQ_USERNAME);
        // TODO: producttize this
        factory.setPassword(RABBITMQ_USERNAME);
        return factory;
    }

    @Bean
    RabbitMessageListener listener(@Qualifier("eventSubscriber") EventSubscriber subscriber) {
        return new RabbitMessageListener(subscriber);
    }

    @Bean
    SimpleMessageListenerContainer simpleMessageListenerContainer(RabbitMessageListener listener) {
        SimpleMessageListenerContainer container = new SimpleMessageListenerContainer();
        container.setConnectionFactory(connectionFactory());
        container.setQueueNames(QUEUE_NAME);
        container.setMessageListener(listener);

        return container;
    }
}
