package com.jleoirab.xando.engine.api.v1.request;

import lombok.Builder;
import lombok.Value;
import lombok.extern.jackson.Jacksonized;

/** Created by jleoirab on 2021-02-09 */
@Value
@Builder
@Jacksonized
public class CreatePlayerRequest {
    String playerName;
}
