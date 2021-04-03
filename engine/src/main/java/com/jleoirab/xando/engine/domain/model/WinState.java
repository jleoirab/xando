package com.jleoirab.xando.engine.domain.model;

import lombok.Builder;
import lombok.Value;

/**
 * Created by jleoirab on 2021-04-03
 */
@Value
@Builder
public class WinState {
    PlayerTag winner;
    int[] winLine;
}
