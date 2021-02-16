package com.jleoirab.xando.service.errors;

/**
 * Created by jleoirab on 2021-02-15
 */
public class GameAlreadyStartedException extends ServiceException {
    public GameAlreadyStartedException() {
        super("Game already started. Player can no longer join.");
    }
}
