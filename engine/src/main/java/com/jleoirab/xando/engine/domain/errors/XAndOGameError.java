package com.jleoirab.xando.engine.domain.errors;

/**
 * Created by jleoirab on 2021-02-16
 */
public abstract class XAndOGameError extends Exception {
    XAndOGameError(String message) {
        super(message);
    }
}
