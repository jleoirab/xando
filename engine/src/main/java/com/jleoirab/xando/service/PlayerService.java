package com.jleoirab.xando.service;

import com.jleoirab.xando.domain.Player;
import com.jleoirab.xando.service.errors.PlayerCreationException;

/**
 * Created by jleoirab on 2021-02-09
 */
public interface PlayerService {
    Player createPlayer(String playerName) throws PlayerCreationException;
}
