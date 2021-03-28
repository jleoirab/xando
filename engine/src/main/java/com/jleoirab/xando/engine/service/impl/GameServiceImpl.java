package com.jleoirab.xando.engine.service.impl;

import com.jleoirab.xando.engine.service.errors.IllegalGameAccessException;
import com.jleoirab.xando.engine.domain.errors.XAndOGameError;
import com.jleoirab.xando.engine.domain.model.*;
import com.jleoirab.xando.engine.repository.GameRepository;
import com.jleoirab.xando.engine.service.GameService;
import com.jleoirab.xando.engine.service.errors.NoGameFoundException;
import com.jleoirab.xando.engine.service.errors.ServiceException;

import java.util.Optional;
import java.util.UUID;

import static com.google.common.base.Preconditions.checkNotNull;

/** Created by jleoirab on 2021-02-09 */
public class GameServiceImpl implements GameService {
    private final GameRepository gameRepository;

    public GameServiceImpl(GameRepository gameRepository) {
        this.gameRepository = checkNotNull(gameRepository, "gameRepository is null in GameServiceImpl#GameServiceImpl");
    }

    @Override
    public Optional<Game> getGameByIdForPlayer(String gameId, Player player) throws IllegalGameAccessException {
        Optional<Game> gameOptional = gameRepository.findByGameId(gameId);

        if (gameOptional.isEmpty()) return gameOptional;

        Game game = gameOptional.get();
        GamePlayer gamePlayer = GamePlayer.from(player);

        if (game.getPlayerX().equals(gamePlayer) || game.getPlayerO().equals(gamePlayer)) {
            return gameOptional;
        }

        throw new IllegalGameAccessException();
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
