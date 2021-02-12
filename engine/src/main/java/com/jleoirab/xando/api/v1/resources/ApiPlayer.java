package com.jleoirab.xando.api.v1.resources;

import com.jleoirab.xando.domain.Player;
import lombok.Builder;
import lombok.Value;

/**
 * Created by jleoirab on 2021-02-09
 */
@Value
@Builder
public class ApiPlayer {
    String id;
    String playerName;

    public static ApiPlayer from(Player player) {
        if (player == null) return null;

        return ApiPlayer.builder()
                .id(player.getId())
                .playerName(player.getPlayerName())
                .build();
    }
}
