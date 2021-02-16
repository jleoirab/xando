package com.jleoirab.xando.repository.mongodb;

import com.jleoirab.xando.domain.model.Player;
import com.jleoirab.xando.repository.PlayerRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by jleoirab on 2021-02-15
 */
@Repository
public interface MongoDBPlayerRepository extends PlayerRepository, MongoRepository<Player, String> {
}
