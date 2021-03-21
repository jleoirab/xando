package com.jleoirab.xando.engine.service.impl;

import com.jleoirab.xando.engine.domain.model.Player;
import com.jleoirab.xando.engine.repository.PlayerRepository;
import com.jleoirab.xando.engine.service.PlayerService;

import java.util.Optional;
import java.util.UUID;

import static com.google.common.base.Preconditions.checkNotNull;

/** Created by jleoirab on 2021-02-09 */
public class PlayerServiceImpl implements PlayerService {
    private final PlayerRepository playerRepository;

    public PlayerServiceImpl(PlayerRepository playerRepository) {
        this.playerRepository = checkNotNull(playerRepository, "playerRepository is null in PlayerServiceImpl#PlayerServiceImpl");
    }

    @Override
    public Player createPlayer(String playerName) {
        Player unsavedPlayer = Player.builder().playerId(UUID.randomUUID().toString()).playerName(playerName).build();
        return playerRepository.save(unsavedPlayer);
    }

    @Override
    public Optional<Player> getPlayer(String playerId) {
        return playerRepository.findByPlayerId(playerId);
    }
}
