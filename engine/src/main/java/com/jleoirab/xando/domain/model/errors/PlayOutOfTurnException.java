package com.jleoirab.xando.domain.model.errors;

/**
 * Created by jleoirab on 2021-02-15
 */
public class PlayOutOfTurnException extends XAndOGameError {
    public PlayOutOfTurnException() {
        super("Move was made out of turn");
    }
}
