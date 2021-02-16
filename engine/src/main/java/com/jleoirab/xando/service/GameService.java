package com.jleoirab.xando.service;

import com.jleoirab.xando.domain.model.Game;
import com.jleoirab.xando.domain.model.Player;
import com.jleoirab.xando.domain.model.errors.XAndOGameError;
import com.jleoirab.xando.service.errors.ServiceException;

/** Created by jleoirab on 2021-02-09 */
public interface GameService {
    Game createGame(Player player) throws ServiceException;

    Game joinGame(String gameId, Player player) throws ServiceException, XAndOGameError;
}
