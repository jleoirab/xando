package com.jleoirab.xando.domain.model.errors;

/**
 * Created by jleoirab on 2021-02-15
 */
public class PlayerIsCreatorException extends XAndOGameError {
    public PlayerIsCreatorException() {
        super("Player is the creator of this game.");
    }
}
