package com.jleoirab.xando.service.errors;

/**
 * Created by jleoirab on 2021-02-15
 */
public class IllegalPlayerMoveException extends ServiceException {
    public IllegalPlayerMoveException() {
        super("Illegal move by player. Player can only play using their player tag.");
    }
}
