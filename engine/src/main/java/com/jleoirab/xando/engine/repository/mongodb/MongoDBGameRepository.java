package com.jleoirab.xando.engine.repository.mongodb;

import com.jleoirab.xando.engine.domain.model.Game;
import com.jleoirab.xando.engine.repository.GameRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by jleoirab on 2021-02-15
 */
@Repository(value = "mongoDBGameRepository")
public interface MongoDBGameRepository extends GameRepository, MongoRepository<Game, String> {
}
