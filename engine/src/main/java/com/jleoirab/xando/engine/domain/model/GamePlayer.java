package com.jleoirab.xando.engine.domain.model;

import lombok.Builder;
import lombok.NonNull;
import lombok.Value;

/**
 * Created by jleoirab on 2021-02-15
 */
@Value
@Builder
public class GamePlayer {
    @NonNull String playerId;
    @NonNull String playerName;

    public static GamePlayer from(Player player) {
        return GamePlayer.builder()
                .playerId(player.getPlayerId())
                .playerName(player.getPlayerName())
                .build();
    }
}
