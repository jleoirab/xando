package com.jleoirab.xando.service.errors;

/**
 * Created by jleoirab on 2021-02-15
 */
public class NoGameFoundException extends ServiceException {
    public NoGameFoundException() {
        super("Game not found.");
    }
}
