package com.jleoirab.xando.domain;

import lombok.Builder;
import lombok.Value;

/**
 * Created by jleoirab on 2021-02-09
 */
@Value
@Builder
public class GameStatus {
    @Builder.Default PlayerTag currentPlayerTurn = PlayerTag.PLAYER_X;
    @Builder.Default boolean isFinished = false;
    @Builder.Default PlayerTag winner = null;
}
