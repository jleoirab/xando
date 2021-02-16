package com.jleoirab.xando.service.impl;

import com.jleoirab.xando.domain.Game;
import com.jleoirab.xando.domain.GamePlayer;
import com.jleoirab.xando.domain.GameStatus;
import com.jleoirab.xando.domain.Player;
import com.jleoirab.xando.repository.GameRepository;
import com.jleoirab.xando.service.GameService;
import org.springframework.stereotype.Service;

import java.util.UUID;

import static com.google.common.base.Preconditions.checkNotNull;

/** Created by jleoirab on 2021-02-09 */
@Service
public class GameServiceImpl implements GameService {
    private final GameRepository gameRepository;

    public GameServiceImpl(GameRepository gameRepository) {
        this.gameRepository = checkNotNull(gameRepository, "gameRepository is null in GameServiceImpl#GameServiceImpl");
    }

    @Override
    public Game createGame(Player player) {
        Game unsavedGame = Game.builder()
                .gameId(UUID.randomUUID().toString())
                .gameBoard(",,,,,,,,")
                .playerX(GamePlayer.from(player))
                .gameStatus(GameStatus.builder().build())
                .build();

        return gameRepository.save(unsavedGame);
    }
}
