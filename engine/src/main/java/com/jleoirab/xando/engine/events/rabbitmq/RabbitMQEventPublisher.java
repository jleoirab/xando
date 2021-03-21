package com.jleoirab.xando.engine.events.rabbitmq;

import com.jleoirab.xando.engine.events.EventPublisher;
import com.jleoirab.xando.protos.events.GameEvent;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

import java.util.function.Supplier;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Created by jleoirab on 2021-03-14
 */
public class RabbitMQEventPublisher implements EventPublisher {
    private final Supplier<String> routingKeySupplier;
    private final RabbitTemplate template;

    public RabbitMQEventPublisher(Supplier<String> routingKeySupplier, RabbitTemplate template) {
        this.routingKeySupplier = checkNotNull(routingKeySupplier, "channelName is null in RabbitMQEventPublisher#RabbitMQEventPublisher");
        this.template = checkNotNull(template, "template is null in RabbitMQEventPublisher#RabbitMQEventPublisher");
    }

    @Override
    public void publishEvent(GameEvent gameEvent) {
        template.convertAndSend(routingKeySupplier.get(), gameEvent.getEventCase().toString(), gameEvent.toByteArray());
    }
}
