package com.jleoirab.xando.domain;

import lombok.Builder;
import lombok.Value;

/**
 * Created by jleoirab on 2021-02-09
 */
@Value
@Builder
public class Player {
    String id;
    String playerName;
}
