package com.jleoirab.xando.api.v1.request;

import lombok.Data;
import lombok.Value;

/**
 * Created by jleoirab on 2021-02-09
 */
@Data
@Value
public class CreatePlayerRequest {
    String playerName;
}
