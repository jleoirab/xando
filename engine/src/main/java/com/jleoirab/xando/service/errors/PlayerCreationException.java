package com.jleoirab.xando.service.errors;

/** Created by jleoirab on 2021-02-11 */
public class PlayerCreationException extends ServiceException {
    PlayerCreationException() {
        super("Could not create player.");
    }
}
