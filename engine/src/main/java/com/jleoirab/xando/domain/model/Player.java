package com.jleoirab.xando.domain.model;

import com.jleoirab.xando.domain.errors.XAndOGameError;
import lombok.Builder;
import lombok.NonNull;
import lombok.Value;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

/** Created by jleoirab on 2021-02-09 */
@Value
@Builder
public class Player {
    @Id
    String uid;
    @Indexed
    @NonNull String playerId;
    @NonNull String playerName;

    /**
     * Used by a player to join a game.
     * see {@link Game}
     * @param game The game to join.
     * @throws XAndOGameError This exception will be thrown if there was an issue attempting to join the game.
     */
    public void joinGame(Game game) throws XAndOGameError {
        game.acceptPlayer(this);
    }

    /**
     * Used by a player to attempt a move in a game.
     * @param game The game the move is for
     * @param cellIndex The cell index the player is trying to play on
     * @param playerTag The player tag that the player is playing with.
     * @throws XAndOGameError This will be thrown if there is an issue attempting to make this move.
     */
    public void makeMove(Game game, int cellIndex, PlayerTag playerTag) throws XAndOGameError {
         game.acceptMove(Move.builder()
                 .player(this)
                 .playerTag(playerTag)
                 .cellIndex(cellIndex)
                 .build());
    }
}
