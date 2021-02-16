package com.jleoirab.xando.repository;

import com.jleoirab.xando.domain.Game;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

/**
 * Created by jleoirab on 2021-02-15
 */
public interface GameRepository extends CrudRepository<Game, String> {
    Optional<Game> findByGameId(String gameId);
}
