package com.jleoirab.xando.api.v1.request;

import com.jleoirab.xando.api.v1.resources.ApiPlayerTag;
import lombok.Builder;
import lombok.Value;

/**
 * Created by jleoirab on 2021-02-17
 */
@Value
@Builder
public class MakeMoveRequest {
    ApiPlayerTag playerTag;
    int cellIndex;
}
