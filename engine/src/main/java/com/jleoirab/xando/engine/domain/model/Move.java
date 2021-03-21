package com.jleoirab.xando.engine.domain.model;

import lombok.Builder;
import lombok.NonNull;
import lombok.Value;

/**
 * Created by jleoirab on 2021-02-15
 */
@Value
@Builder
public class Move {
    @NonNull Player player;
    @NonNull PlayerTag playerTag;
    int cellIndex;
}
