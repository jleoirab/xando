package com.jleoirab.xando.service.errors;

/**
 * Created by jleoirab on 2021-02-15
 */
public class CellAlreadyOccupiedException extends ServiceException {
    public CellAlreadyOccupiedException() {
        super("Cannot play in cell position because it is already occupied.");
    }
}
