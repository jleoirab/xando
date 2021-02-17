package com.jleoirab.xando.api.v1.resources;

import com.jleoirab.xando.domain.model.Game;
import lombok.Builder;
import lombok.Value;

/** Created by jleoirab on 2021-02-09 */
@Value
@Builder
public class ApiGame {
    String uid;
    String id;
    String gameCreatorPlayerId;
    ApiGamePlayer playerX;
    ApiGamePlayer playerO;
    char[] gameBoard;
    ApiPlayerTag currentPlayerTurn;
    ApiGameStatus gameStatus;

    public static ApiGame from(Game game) {
        if (game == null) return null;

        return ApiGame.builder()
                .uid(game.getUid())
                .id(game.getGameId())
                .gameCreatorPlayerId(game.getGameCreatorPlayerId())
                .playerX(ApiGamePlayer.from(game.getPlayerX()))
                .playerO(ApiGamePlayer.from(game.getPlayerO()))
                .gameBoard(game.getGameBoard())
                .currentPlayerTurn(ApiPlayerTag.from(game.getCurrentPlayerTurn()))
                .gameStatus(ApiGameStatus.from(game.getGameStatus()))
                .build();
    }
}
