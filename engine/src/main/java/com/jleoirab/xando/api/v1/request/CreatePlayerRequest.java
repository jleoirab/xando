package com.jleoirab.xando.api.v1.request;

import lombok.Builder;
import lombok.Data;
import lombok.Value;

/**
 * Created by jleoirab on 2021-02-09
 */
@Data
@Value
@Builder
public class CreatePlayerRequest {
    String playerName;
}
