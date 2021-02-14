package com.jleoirab.xando.service.impl;

import com.jleoirab.xando.domain.Player;
import com.jleoirab.xando.service.PlayerService;
import java.util.UUID;
import org.springframework.stereotype.Service;

/** Created by jleoirab on 2021-02-09 */
@Service
public class PlayerServiceImpl implements PlayerService {
    @Override
    public Player createPlayer(String playerName) {
        return Player.builder().id(UUID.randomUUID().toString()).playerName(playerName).build();
    }

    @Override
    public Player getPlayer(String playerId, String playerName) {
        return Player.builder().id(playerId).playerName(playerName).build();
    }
}
