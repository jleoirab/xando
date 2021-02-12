package com.jleoirab.xando.api.v1.resources;

import com.jleoirab.xando.domain.GameStatus;
import lombok.Builder;
import lombok.Data;
import lombok.Value;

/**
 * Created by jleoirab on 2021-02-09
 */
@Data
@Value
@Builder
public class ApiGameStatus {
    ApiPlayerTag currentPlayerTurn;
    boolean isFinished;
    ApiPlayerTag winner;

    public static ApiGameStatus from(GameStatus gameStatus) {
        if (gameStatus == null) return null;

        return ApiGameStatus.builder()
                .currentPlayerTurn(ApiPlayerTag.from(gameStatus.getCurrentPlayerTurn()))
                .isFinished(gameStatus.isFinished())
                .winner(ApiPlayerTag.from(gameStatus.getWinner()))
                .build();
    }
}
