package com.jleoirab.xando.engine.events;

import com.jleoirab.xando.protos.events.GameEvent;

/**
 * Created by jleoirab on 2021-03-14
 */
public interface EventPublisher {
    void publishEvent(GameEvent gameEvent);
}
