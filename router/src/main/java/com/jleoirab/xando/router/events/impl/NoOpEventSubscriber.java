package com.jleoirab.xando.router.events.impl;

import com.jleoirab.xando.protos.events.GameEvent;
import com.jleoirab.xando.router.events.EventSubscriber;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by jleoirab on 2021-03-21
 */
public class NoOpEventSubscriber implements EventSubscriber {
    private static final Logger LOG = LoggerFactory.getLogger(NoOpEventSubscriber.class);

    @Override
    public void handleGameEvent(GameEvent gameEvent) {
        LOG.info("Event = {}", gameEvent);
    }
}
