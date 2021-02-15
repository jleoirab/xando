package com.jleoirab.xando.repository;

import com.jleoirab.xando.domain.Player;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Created by jleoirab on 2021-02-15
 */
@Repository
public interface PlayerRepository extends MongoRepository<Player, String> {
    Optional<Player> findByPlayerId(String playerId);
}
