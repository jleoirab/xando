package com.jleoirab.xando.engine.repository;

import com.jleoirab.xando.engine.domain.model.Player;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

/**
 * Created by jleoirab on 2021-02-15
 */
public interface PlayerRepository extends CrudRepository<Player, String> {
    Optional<Player> findByPlayerId(String playerId);
}
