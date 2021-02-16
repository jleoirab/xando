package com.jleoirab.xando.domain.errors;

/**
 * Created by jleoirab on 2021-02-15
 */
public class GameAlreadyStartedException extends XAndOGameError {
    public GameAlreadyStartedException() {
        super("Game already started. Player can no longer join.");
    }
}
