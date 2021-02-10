package com.jleoirab.xando.domain;

import lombok.Builder;
import lombok.Data;

/**
 * Created by jleoirab on 2021-02-09
 */
@Data
@Builder
public class Game {
    private String id;
    private Player playerX;
    private Player playerO;
    private String gameBoard;
    private GameStatus gameStatus;

}
