package com.jleoirab.xando.service.errors;

/**
 * Created by jleoirab on 2021-02-15
 */
public class PlayOutOfTurnException extends ServiceException {
    public PlayOutOfTurnException() {
        super("Move was made out of turn");
    }
}
