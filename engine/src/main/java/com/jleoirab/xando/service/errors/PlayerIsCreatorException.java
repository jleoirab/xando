package com.jleoirab.xando.service.errors;

/**
 * Created by jleoirab on 2021-02-15
 */
public class PlayerIsCreatorException extends ServiceException {
    public PlayerIsCreatorException() {
        super("Player is the creator of this game.");
    }
}
