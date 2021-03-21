package com.jleoirab.xando.engine.events.rabbitmq;

import com.jleoirab.xando.engine.events.EventPublisher;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by jleoirab on 2021-03-14
 */
@Configuration
public class RabbitMQConfiguration {
    private static final String QUEUE_NAME = "event-queue";
    private static final String EVENT_QUEUE_EXCHANGE_NAME = QUEUE_NAME + "-exchange";
    private static final String RABBITMQ_USERNAME = "xando-engine";

    @Bean
    CachingConnectionFactory connectionFactory() {
        CachingConnectionFactory factory = new CachingConnectionFactory("localhost");
        factory.setUsername(RABBITMQ_USERNAME);
        // TODO: producttize this
        factory.setPassword(RABBITMQ_USERNAME);
        return factory;
    }

    @Bean
    public RabbitTemplate rabbitTemplate() {
        return new RabbitTemplate(connectionFactory());
    }

    @Bean
    TopicExchange exchange() {
        return new TopicExchange(EVENT_QUEUE_EXCHANGE_NAME);
    }

    @Bean
    EventPublisher rabbitMQEventPublisher() {
        return new RabbitMQEventPublisher(exchange()::getName, rabbitTemplate());
    }
}