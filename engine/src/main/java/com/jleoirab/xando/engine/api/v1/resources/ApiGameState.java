package com.jleoirab.xando.engine.api.v1.resources;

import com.jleoirab.xando.engine.domain.model.GameState;

/** Created by jleoirab on 2021-02-12 */
public enum ApiGameState {
    CREATED,
    IN_PROGRESS,
    FINISHED;

    public static ApiGameState from(GameState state) {
        return ApiGameState.valueOf(state.name());
    }
}
