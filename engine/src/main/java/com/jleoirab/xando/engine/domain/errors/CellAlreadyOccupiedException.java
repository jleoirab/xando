package com.jleoirab.xando.engine.domain.errors;

/**
 * Created by jleoirab on 2021-02-15
 */
public class CellAlreadyOccupiedException extends XAndOGameError {
    public CellAlreadyOccupiedException() {
        super("Cannot play in cell position because it is already occupied.");
    }
}
