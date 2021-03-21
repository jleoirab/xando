package com.jleoirab.xando.engine.service.errors;

/** Created by jleoirab on 2021-02-11 */
public class GameCreationException extends ServiceException {
    GameCreationException() {
        super("Could not create game.");
    }
}
