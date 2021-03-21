package com.jleoirab.xando.engine.repository.mongodb;

import com.jleoirab.xando.engine.domain.model.Player;
import com.jleoirab.xando.engine.repository.PlayerRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by jleoirab on 2021-02-15
 */
@Repository(value = "mongoDBPlayerRepository")
public interface MongoDBPlayerRepository extends PlayerRepository, MongoRepository<Player, String> {
}
