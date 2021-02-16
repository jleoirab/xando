package com.jleoirab.xando.service;

import com.jleoirab.xando.domain.model.Player;
import com.jleoirab.xando.service.errors.ServiceException;

import java.util.Optional;

/** Created by jleoirab on 2021-02-09 */
public interface PlayerService {
    Player createPlayer(String playerName) throws ServiceException;

    /**
     * This must be removed. This is just to allow for testing token based authentication.
     *
     * @param playerId The player ID
     * @return
     */
    Optional<Player> getPlayer(String playerId) throws ServiceException;
}
