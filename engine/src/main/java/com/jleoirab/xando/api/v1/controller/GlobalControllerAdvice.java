package com.jleoirab.xando.api.v1.controller;

import com.jleoirab.xando.api.v1.resources.ApiError;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Created by jleoirab on 2021-02-11
 */
@RestControllerAdvice
public class GlobalControllerAdvice {
    @ExceptionHandler(ApiException.class)
    ResponseEntity<ApiError> handleApiException(ApiException exception) {
        ApiError error = ApiError.builder()
                .message(exception.getErrorMessage())
                .build();

        return new ResponseEntity<>(error, exception.getStatus());
    }
}
