package com.jleoirab.xando.engine.api.v1.resources;

import com.jleoirab.xando.engine.domain.model.GameStatus;
import lombok.Builder;
import lombok.Value;

/** Created by jleoirab on 2021-02-09 */
@Value
@Builder
public class ApiGameStatus {
    ApiGameState state;
    ApiPlayerTag winner;

    public static ApiGameStatus from(GameStatus gameStatus) {
        if (gameStatus == null) return null;

        return ApiGameStatus.builder()
                .state(ApiGameState.from(gameStatus.getState()))
                .winner(ApiPlayerTag.from(gameStatus.getWinner()))
                .build();
    }
}
