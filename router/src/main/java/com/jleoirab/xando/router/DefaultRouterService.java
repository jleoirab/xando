package com.jleoirab.xando.router;

import com.jleoirab.xando.protos.events.GameEvent;
import com.jleoirab.xando.router.websocket.WebSocketService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Created by jleoirab on 2021-03-21
 */
public class DefaultRouterService implements RouterService {
    private static final Logger LOG = LoggerFactory.getLogger(DefaultRouterService.class);

    private final WebSocketService webSocketService;

    public DefaultRouterService(WebSocketService webSocketService) {
        this.webSocketService = checkNotNull(webSocketService, "webSocketService is null in DefaultRouterService#DefaultRouterService");
    }

    @Override
    public void route(GameEvent event) {
        LOG.info("Event = {}", event);
        webSocketService.sendToQueue(event.getGame().getUid(), event);
    }
}
