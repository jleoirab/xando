package com.jleoirab.xando.router.websocket.impl;

import com.jleoirab.xando.protos.events.GameEvent;
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

    public WebSocketServiceImpl(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = checkNotNull(simpMessagingTemplate, "simpMessagingTemplate is null in WebSocketServiceImpl#WebSocketServiceImpl");
    }

    @Override
    public void sendToQueue(String queue, GameEvent event) {
        simpMessagingTemplate.convertAndSend(String.format("/queue/%s", queue), event);
    }
}
