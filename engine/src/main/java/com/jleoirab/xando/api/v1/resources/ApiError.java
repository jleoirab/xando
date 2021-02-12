package com.jleoirab.xando.api.v1.resources;

import lombok.Builder;
import lombok.NonNull;
import lombok.Value;

/**
 * Created by jleoirab on 2021-02-11
 */
@Value
@Builder
public class ApiError {
    @NonNull String message;
}
