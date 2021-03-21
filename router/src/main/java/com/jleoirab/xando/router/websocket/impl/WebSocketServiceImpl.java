package com.jleoirab.xando.router.websocket.impl;

import com.jleoirab.xando.protos.events.GameEvent;
import com.jleoirab.xando.router.websocket.EventConverter;
import com.jleoirab.xando.router.websocket.WebSocketService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Created by jleoirab on 2021-03-21
 */
public class WebSocketServiceImpl implements WebSocketService {
    private static final Logger LOG = LoggerFactory.getLogger(WebSocketServiceImpl.class);

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final EventConverter eventFormatter;

    public WebSocketServiceImpl(SimpMessagingTemplate simpMessagingTemplate, EventConverter eventFormatter) {
        this.simpMessagingTemplate = checkNotNull(simpMessagingTemplate, "simpMessagingTemplate is null in WebSocketServiceImpl#WebSocketServiceImpl");
        this.eventFormatter = checkNotNull(eventFormatter, "eventFormatter is null in WebSocketServiceImpl#WebSocketServiceImpl");
    }

    @Override
    public void sendToQueue(String queue, GameEvent event) {
        try {
            String message = eventFormatter.apply(event);
            simpMessagingTemplate.convertAndSend(String.format("/queue/%s", queue), message);
        } catch (Exception e) {
            LOG.error("Error sending message to queue", e);
        }
    }
}
