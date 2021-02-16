package com.jleoirab.xando.service.impl;

import com.jleoirab.xando.domain.model.Game;
import com.jleoirab.xando.domain.model.GamePlayer;
import com.jleoirab.xando.domain.model.GameStatus;
import com.jleoirab.xando.domain.model.Player;
import com.jleoirab.xando.domain.errors.XAndOGameError;
import com.jleoirab.xando.repository.GameRepository;
import com.jleoirab.xando.service.GameService;
import com.jleoirab.xando.service.errors.NoGameFoundException;
import com.jleoirab.xando.service.errors.ServiceException;
import org.springframework.stereotype.Service;

import java.util.Optional;
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
                .gameCreatorPlayerId(player.getPlayerId())
                .playerX(GamePlayer.from(player))
                .gameStatus(GameStatus.builder().build())
                .build();

        return gameRepository.save(unsavedGame);
    }

    @Override
    public Game joinGame(String gameId, Player player) throws ServiceException, XAndOGameError {
        Optional<Game> gameOptional = gameRepository.findByGameId(gameId);

        if (gameOptional.isEmpty()) {
            throw new NoGameFoundException();
        }

        Game game = gameOptional.get();
        player.joinGame(game);

        return gameRepository.save(game);
    }
}
