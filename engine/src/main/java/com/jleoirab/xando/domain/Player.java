package com.jleoirab.xando.domain;

import lombok.Builder;
import lombok.Value;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

/** Created by jleoirab on 2021-02-09 */
@Value
@Builder
public class Player {
    @Id
    String uid;
    @Indexed
    String playerId;
    String playerName;
}
