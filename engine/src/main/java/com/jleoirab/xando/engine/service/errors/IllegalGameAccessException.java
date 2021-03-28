package com.jleoirab.xando.engine.service.errors;

/**
 * Created by jleoirab on 2021-03-28
 */
public class IllegalGameAccessException extends ServiceException {
    public IllegalGameAccessException() {
        super("Player is not allowed to access this game.");
    }
}
