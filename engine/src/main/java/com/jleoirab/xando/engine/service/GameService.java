package com.jleoirab.xando.engine.service;

import com.jleoirab.xando.engine.domain.errors.XAndOGameError;
import com.jleoirab.xando.engine.domain.model.Game;
import com.jleoirab.xando.engine.domain.model.Player;
import com.jleoirab.xando.engine.domain.model.PlayerTag;
import com.jleoirab.xando.engine.service.errors.IllegalGameAccessException;
import com.jleoirab.xando.engine.service.errors.ServiceException;

import java.util.Optional;

/** Created by jleoirab on 2021-02-09 */
public interface GameService {
    Optional<Game> getGameByIdForPlayer(String gameId, Player player) throws IllegalGameAccessException;

    Game createGame(Player player) throws ServiceException;

    Game joinGame(String gameId, Player player) throws ServiceException, XAndOGameError;

    Game makeMove(String gameId, Player player, PlayerTag playerTag, int cellIndex) throws ServiceException, XAndOGameError;
}
