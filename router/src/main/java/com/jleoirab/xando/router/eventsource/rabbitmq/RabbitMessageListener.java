package com.jleoirab.xando.router.eventsource.rabbitmq;

import com.google.protobuf.InvalidProtocolBufferException;
import com.jleoirab.xando.protos.events.GameEvent;
import com.jleoirab.xando.router.events.EventSubscriber;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageListener;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Created by jleoirab on 2021-03-21
 */
public class RabbitMessageListener implements MessageListener {
    private static final Logger LOG = LoggerFactory.getLogger(RabbitMessageListener.class);

    private final EventSubscriber subscriber;

    public RabbitMessageListener(EventSubscriber subscriber) {
        this.subscriber = checkNotNull(subscriber, "subscriber is null in RabbitMessageListener#RabbitMessageListener");
    }

    @Override
    public void onMessage(Message message) {
        try {
            GameEvent event = GameEvent.parseFrom(message.getBody());
            subscriber.handleGameEvent(event);
        } catch (InvalidProtocolBufferException e) {
            LOG.error("Could not parse game event from RabbitMQ queue");
        }
    }
}
