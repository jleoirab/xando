package com.jleoirab.xando.engine.service.events;

import com.jleoirab.xando.engine.domain.errors.XAndOGameError;
import com.jleoirab.xando.engine.domain.model.Game;
import com.jleoirab.xando.engine.domain.model.Player;
import com.jleoirab.xando.engine.domain.model.PlayerTag;
import com.jleoirab.xando.engine.events.EventPublisher;
import com.jleoirab.xando.protos.events.GameEvent;
import com.jleoirab.xando.protos.events.JoinGameEvent;
import com.jleoirab.xando.protos.events.MoveEvent;
import com.jleoirab.xando.engine.service.GameService;
import com.jleoirab.xando.engine.service.errors.ServiceException;

/**
 * Created by jleoirab on 2021-03-14
 */
public class PublishingGameService implements GameService {
    private final GameService delegate;
    private final EventPublisher publisher;

    public PublishingGameService(GameService delegate, EventPublisher publisher) {
        this.delegate = delegate;
        this.publisher = publisher;
    }

    @Override
    public Game createGame(Player player) throws ServiceException {
        return delegate.createGame(player);
        // TODO if AI is opponent, publish event
    }

    @Override
    public Game joinGame(String gameId, Player player) throws ServiceException, XAndOGameError {
        Game game = delegate.joinGame(gameId, player);

        GameEvent event = GameEvent.newBuilder()
                .setJoinGameEvent(JoinGameEvent.newBuilder()
                        .setGame(DomainToEventMapper.from(game))
                        .setGamePlayer(DomainToEventMapper.from(player))
                        .build())
                .build();

        publisher.publishEvent(event);

        return game;
    }

    @Override
    public Game makeMove(String gameId, Player player, PlayerTag playerTag, int cellIndex) throws ServiceException, XAndOGameError {
        Game game = delegate.makeMove(gameId, player, playerTag, cellIndex);

        GameEvent event = GameEvent.newBuilder()
                .setMoveEvent(MoveEvent.newBuilder()
                        .setGame(DomainToEventMapper.from(game))
                        .setGamePlayer(DomainToEventMapper.from(player))
                        .setCellIndex(cellIndex)
                        .setPlayerTag(DomainToEventMapper.from(playerTag))
                        .build())
                .build();

        publisher.publishEvent(event);

        return game;
    }
}
