package com.jleoirab.xando.router.events.impl;

import com.jleoirab.xando.protos.events.GameEvent;
import com.jleoirab.xando.router.RouterService;
import com.jleoirab.xando.router.events.EventSubscriber;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Created by jleoirab on 2021-03-21
 */
public class DefaultEventSubscriber implements EventSubscriber {
    private final RouterService router;

    public DefaultEventSubscriber(RouterService router) {
        this.router = checkNotNull(router, "router is null in DefaultEventSubscriber#DefaultEventSubscriber");
    }

    @Override
    public void handleGameEvent(GameEvent gameEvent) {
        router.route(gameEvent);
    }
}
