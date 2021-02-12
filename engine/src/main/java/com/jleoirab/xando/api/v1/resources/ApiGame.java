package com.jleoirab.xando.api.v1.resources;

import com.jleoirab.xando.domain.Game;
import lombok.Builder;
import lombok.Value;

/**
 * Created by jleoirab on 2021-02-09
 */
@Value
@Builder
public class ApiGame {
    String id;
    ApiPlayer playerX;
    ApiPlayer playerO;
    String gameBoard;
    ApiGameStatus gameStatus;

    public static ApiGame from(Game game) {
        if (game == null) return null;

        return ApiGame.builder()
                .id(game.getId())
                .playerX(ApiPlayer.from(game.getPlayerX()))
                .playerO(ApiPlayer.from(game.getPlayerO()))
                .gameBoard(game.getGameBoard())
                .gameStatus(ApiGameStatus.from(game.getGameStatus()))
                .build();
    }
}
