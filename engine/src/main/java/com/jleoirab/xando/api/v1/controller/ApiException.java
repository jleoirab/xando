package com.jleoirab.xando.api.v1.controller;

import org.springframework.http.HttpStatus;

/**
 * Created by jleoirab on 2021-02-11
 */
public class ApiException extends RuntimeException {
    private final String message;
    private final HttpStatus status;

    ApiException() {
        this("", HttpStatus.BAD_REQUEST);
    }

    ApiException(HttpStatus status) {
        this("", status);
    }

    ApiException(String message, HttpStatus status) {
        super(message);

        this.message = message;
        this.status = status;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
