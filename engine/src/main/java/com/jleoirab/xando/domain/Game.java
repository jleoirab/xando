package com.jleoirab.xando.domain;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

/** Created by jleoirab on 2021-02-09 */
@Data
@Builder
public class Game {
    @Id
    private String uid;
    @Indexed
    private String gameId;
    private GamePlayer playerX;
    private GamePlayer playerO;
    private String gameBoard;
    private GameStatus gameStatus;
}
