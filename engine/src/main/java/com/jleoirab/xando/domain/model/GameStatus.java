package com.jleoirab.xando.domain.model;

import lombok.Builder;
import lombok.Value;

/** Created by jleoirab on 2021-02-09 */
@Value
@Builder
public class GameStatus {
    @Builder.Default GameState state = GameState.CREATED;
    @Builder.Default PlayerTag winner = null;
}
