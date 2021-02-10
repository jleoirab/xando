package com.jleoirab.xando.service.impl;

import com.jleoirab.xando.domain.Game;
import com.jleoirab.xando.domain.GameStatus;
import com.jleoirab.xando.domain.Player;
import com.jleoirab.xando.service.GameService;
import org.springframework.stereotype.Service;

import java.util.UUID;

/**
 * Created by jleoirab on 2021-02-09
 */
@Service
public class GameServiceImpl implements GameService {
    @Override
    public Game createGame(Player player) {
        return Game.builder()
                .id(UUID.randomUUID().toString())
                .gameBoard(",,,,,,,,")
                .playerX(player)
                .gameStatus(GameStatus.builder()
                        .build())
                .build();
    }
}
