package com.jleoirab.xando.domain.errors;

/**
 * Created by jleoirab on 2021-02-15
 */
public class IllegalPlayerMoveException extends XAndOGameError {
    public IllegalPlayerMoveException() {
        super("Illegal move by player. Player can only play using their player tag.");
    }
}
