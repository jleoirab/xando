package com.jleoirab.xando.engine.domain.errors;

/**
 * Created by jleoirab on 2021-02-17
 */
public class InvalidCellIndex extends XAndOGameError {
    public InvalidCellIndex() {
        super("Invalid cell index provided");
    }
}
