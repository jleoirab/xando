package com.jleoirab.xando.router.websocket;

import com.jleoirab.xando.protos.events.GameEvent;

/**
 * Created by jleoirab on 2021-03-21
 */
@FunctionalInterface
public interface EventConverter {
    String apply(GameEvent input) throws Exception;
}
