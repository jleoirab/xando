package com.jleoirab.xando.repository;

import com.jleoirab.xando.domain.Player;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

/**
 * Created by jleoirab on 2021-02-15
 */
public interface PlayerRepository extends CrudRepository<Player, String> {
    Optional<Player> findByPlayerId(String playerId);
}
