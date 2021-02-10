package com.jleoirab.xando.service.impl;

import com.jleoirab.xando.domain.Player;
import com.jleoirab.xando.service.PlayerService;
import org.springframework.stereotype.Service;

import java.util.UUID;

/**
 * Created by jleoirab on 2021-02-09
 */
@Service
public class PlayerServiceImpl implements PlayerService {
    @Override
    public Player createPlayer(String playerName) {
        return Player.builder()
                .id(UUID.randomUUID().toString())
                .playerName(playerName)
                .build();
    }
}
