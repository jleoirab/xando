package com.jleoirab.xando.engine.domain.model;

import lombok.Builder;
import lombok.NonNull;
import lombok.Value;

/**
 * Created by jleoirab on 2021-04-03
 */
@Value
@Builder
public class GameBoardLine {
    @NonNull int[] cellIndexes;

    public enum GameBoardLines {
        ROW_1(new int[]{0, 1, 2}),
        ROW_2(new int[]{3, 4, 5}),
        ROW_3(new int[]{6, 7, 8}),

        COL_1(new int[]{0, 3, 6}),
        COL_2(new int[]{1, 4, 7}),
        COL_3(new int[]{2, 5, 8}),

        DIAG_1(new int[]{0, 4, 8}),
        DIAG_2(new int[]{2, 4, 6})
        ;

        private final int[] cellIndexes;

        GameBoardLines(int[] cellIndexes) {
            this.cellIndexes = cellIndexes;
        }

        int[] getCellIndexes() {
            return this.cellIndexes;
        }
    }
}
