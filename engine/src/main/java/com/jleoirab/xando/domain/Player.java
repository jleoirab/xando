package com.jleoirab.xando.domain;

import lombok.Builder;
import lombok.Data;
import lombok.Value;

/**
 * Created by jleoirab on 2021-02-09
 */
@Data
@Builder
@Value
public class Player {
    String id;
    String playerName;
}
