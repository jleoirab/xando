package com.jleoirab.xando.engine.api.v1.resources;

import com.jleoirab.xando.engine.domain.model.GamePlayer;
import lombok.Builder;
import lombok.Value;

/**
 * Created by jleoirab on 2021-02-15
 */
@Value
@Builder
public class ApiGamePlayer {
    String id;
    String playerName;

    public static ApiGamePlayer from(GamePlayer player) {
        if (player == null) return null;

        return ApiGamePlayer.builder().id(player.getPlayerId()).playerName(player.getPlayerName()).build();
    }
}
