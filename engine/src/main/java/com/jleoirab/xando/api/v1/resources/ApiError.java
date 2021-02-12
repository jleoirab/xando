package com.jleoirab.xando.api.v1.resources;

import lombok.Builder;
import lombok.Data;
import lombok.Value;

/**
 * Created by jleoirab on 2021-02-11
 */
@Data
@Value
@Builder
public class ApiError {
    String message;
}
