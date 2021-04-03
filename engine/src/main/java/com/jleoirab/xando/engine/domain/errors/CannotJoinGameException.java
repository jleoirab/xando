package com.jleoirab.xando.engine.domain.errors;

/**
 * Created by jleoirab on 2021-04-03
 */
public class CannotJoinGameException extends XAndOGameError {
    public CannotJoinGameException() {
        super("All spots are taken.");
    }
}
