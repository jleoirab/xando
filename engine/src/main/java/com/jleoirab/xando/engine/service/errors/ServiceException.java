package com.jleoirab.xando.engine.service.errors;

/**
 * Created by jleoirab on 2021-02-15
 */
public abstract class ServiceException extends Exception {
    ServiceException(String message) {
        super(message);
    }

}
