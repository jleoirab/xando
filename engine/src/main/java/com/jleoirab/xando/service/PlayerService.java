package com.jleoirab.xando.service;

import com.jleoirab.xando.domain.Player;
import com.jleoirab.xando.service.errors.PlayerCreationException;

/** Created by jleoirab on 2021-02-09 */
public interface PlayerService {
    Player createPlayer(String playerName) throws PlayerCreationException;

    /**
     * This must be removed. This is just to allow for testing token based authentication.
     *
     * @param playerId The player ID
     * @param playerName THe player name
     * @return
     */
    Player getPlayer(String playerId, String playerName);
}
