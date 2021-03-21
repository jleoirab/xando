package com.jleoirab.xando.router.events;

import com.jleoirab.xando.protos.events.GameEvent;

/**
 * Created by jleoirab on 2021-03-21
 */
public interface EventSubscriber {
    void handleGameEvent(GameEvent gameEvent);
}
