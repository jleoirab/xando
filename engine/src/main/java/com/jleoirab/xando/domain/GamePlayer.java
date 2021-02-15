package com.jleoirab.xando.domain;

import lombok.Builder;
import lombok.Value;

/**
 * Created by jleoirab on 2021-02-15
 */
@Value
@Builder
public class GamePlayer {
    String playerId;
    String playerName;

    public static GamePlayer from(Player player) {
        return GamePlayer.builder()
                .playerId(player.getPlayerId())
                .playerName(player.getPlayerName())
                .build();
    }
}
