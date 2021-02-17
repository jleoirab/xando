package com.jleoirab.xando.service.impl;

import com.jleoirab.xando.domain.errors.XAndOGameError;
import com.jleoirab.xando.domain.model.*;
import com.jleoirab.xando.repository.GameRepository;
import com.jleoirab.xando.service.GameService;
import com.jleoirab.xando.service.errors.NoGameFoundException;
import com.jleoirab.xando.service.errors.ServiceException;
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
                .gameCreatorPlayerId(player.getPlayerId())
                .playerX(GamePlayer.from(player))
                .gameStatus(GameStatus.builder().build())
                .build();

        return gameRepository.save(unsavedGame);
    }

    @Override
    public Game joinGame(String gameId, Player player) throws ServiceException, XAndOGameError {
        Game game = gameRepository
                .findByGameId(gameId)
                .orElseThrow(NoGameFoundException::new);

        player.joinGame(game);

        return gameRepository.save(game);
    }

    @Override
    public Game makeMove(String gameId, Player player, PlayerTag playerTag, int cellIndex) throws ServiceException, XAndOGameError {
        Game game = gameRepository
                .findByGameId(gameId)
                .orElseThrow(NoGameFoundException::new);

        player.makeMove(game, playerTag, cellIndex);

        return gameRepository.save(game);
    }
}
