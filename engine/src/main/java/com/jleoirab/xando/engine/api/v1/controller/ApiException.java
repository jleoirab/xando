package com.jleoirab.xando.engine.api.v1.controller;

import org.springframework.http.HttpStatus;

/** Created by jleoirab on 2021-02-11 */
public class ApiException extends RuntimeException {
    private final HttpStatus status;
    private final String errorMessage;

    ApiException() {
        this(HttpStatus.BAD_REQUEST, "");
    }

    ApiException(HttpStatus status) {
        this(status, "");
    }

    ApiException(HttpStatus status, String errorMessage) {
        super(errorMessage);

        this.errorMessage = errorMessage;
        this.status = status;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
