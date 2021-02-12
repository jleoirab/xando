package com.jleoirab.xando.api.v1.request;

import lombok.Builder;
import lombok.Value;

/**
 * Created by jleoirab on 2021-02-09
 */
@Value
@Builder
public class CreatePlayerRequest {
    String playerName;
}
