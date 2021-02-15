package com.jleoirab.xando.repository;

import com.jleoirab.xando.domain.Game;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Created by jleoirab on 2021-02-15
 */
@Repository
public interface GameRepository extends MongoRepository<Game, String> {
    Optional<Game> findByGameId(String gameId);
}
