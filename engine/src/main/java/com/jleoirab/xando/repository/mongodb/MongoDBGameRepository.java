package com.jleoirab.xando.repository.mongodb;

import com.jleoirab.xando.domain.Game;
import com.jleoirab.xando.repository.GameRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by jleoirab on 2021-02-15
 */
@Repository
public interface MongoDBGameRepository extends GameRepository, MongoRepository<Game, String> {
}
