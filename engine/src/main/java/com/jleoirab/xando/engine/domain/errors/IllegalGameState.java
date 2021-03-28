package com.jleoirab.xando.engine.domain.errors;

import com.jleoirab.xando.engine.domain.model.GameState;

/**
 * Created by jleoirab on 2021-03-28
 */
public class IllegalGameState extends XAndOGameError {
    public IllegalGameState(GameState expectedGameState) {
        super("Illegal game state. Expected " + expectedGameState.toString());
    }
}
