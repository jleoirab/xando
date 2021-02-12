package com.jleoirab.xando.service;

import com.jleoirab.xando.domain.Game;
import com.jleoirab.xando.domain.Player;
import com.jleoirab.xando.service.errors.GameCreationException;

/**
 * Created by jleoirab on 2021-02-09
 */
public interface GameService {
    Game createGame(Player player) throws GameCreationException;
}
