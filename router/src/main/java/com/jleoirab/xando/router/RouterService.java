package com.jleoirab.xando.router;

import com.jleoirab.xando.protos.events.GameEvent;

/**
 * Created by jleoirab on 2021-03-21
 */
public interface RouterService {
    void route(GameEvent event);
}
