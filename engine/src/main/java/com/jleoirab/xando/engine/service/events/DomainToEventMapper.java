package com.jleoirab.xando.engine.service.events;

import com.jleoirab.xando.engine.domain.model.Player;
import com.jleoirab.xando.engine.domain.model.PlayerTag;
import com.jleoirab.xando.protos.models.*;

import javax.annotation.Nullable;

/**
 * Created by jleoirab on 2021-03-14
 */
final class DomainToEventMapper {
    public static Game from(com.jleoirab.xando.engine.domain.model.Game game) {
        return Game.newBuilder()
                .setUid(game.getUid())
                .setId(game.getGameId())
                .setGameCreatorPlayerId(game.getGameCreatorPlayerId())
                .setPlayerX(from(game.getPlayerX()))
                .setPlayerO(from(game.getPlayerO()))
                .setGameBoard(from(game.getGameBoard()))
                .setCurrentPlayerTurn(fromNullable(game.getCurrentPlayerTurn()))
                .setGameStatus(from(game.getGameStatus()))
                .build();
    }

    public static GamePlayer from(com.jleoirab.xando.engine.domain.model.GamePlayer gamePlayer) {
        return GamePlayer.newBuilder()
                .setPlayerId(gamePlayer.getPlayerId())
                .setPlayerName(gamePlayer.getPlayerName())
                .build();
    }

    public static GamePlayer from(Player player) {
        return GamePlayer.newBuilder()
                .setPlayerId(player.getPlayerId())
                .setPlayerName(player.getPlayerName())
                .build();
    }

    public static GameBoard from(String[] gameBoard) {
        GameBoard.Builder boardBuilder = GameBoard.newBuilder();

        for(String cell: gameBoard) {
            boardBuilder.addCell(from(cell));
        }

        return boardBuilder.build();
    }

    public static GameBoard.GameBoardCell from(@Nullable String value) {
        if (value == null) return GameBoard.GameBoardCell.UNOCCUPIED;
        else if (value.equals(PlayerTag.PLAYER_X.toString())) return GameBoard.GameBoardCell.X;
        else if (value.equals(PlayerTag.PLAYER_O.toString())) return GameBoard.GameBoardCell.O;
        else return GameBoard.GameBoardCell.UNKNOWN;
    }

    public static com.jleoirab.xando.protos.models.PlayerTag from(PlayerTag playerTag) {
        return playerTag == PlayerTag.PLAYER_X ? com.jleoirab.xando.protos.models.PlayerTag.PLAYER_TAG_X :
                com.jleoirab.xando.protos.models.PlayerTag.PLAYER_TAG_O;

    }

    public static com.jleoirab.xando.protos.models.PlayerTag fromNullable(PlayerTag playerTag) {
        if (playerTag == null) return com.jleoirab.xando.protos.models.PlayerTag.PLAYER_TAG_UNKNOWN;

        return from(playerTag);
    }

    public static GameStatus from(com.jleoirab.xando.engine.domain.model.GameStatus gameStatus) {
        GameStatus.Builder builder = GameStatus.newBuilder()
                .setState(from(gameStatus.getState()));

        if (gameStatus.getWinner() != null) {
            builder.setWinner(from(gameStatus.getWinner()));

            int[] winLine = gameStatus.getWinLine();

            builder.setWinLine(WinLine.newBuilder()
                    .addCell(winLine[0])
                    .addCell(winLine[1])
                    .addCell(winLine[2])
                    .build());
        }

        return builder.build();
    }

    public static GameState from(com.jleoirab.xando.engine.domain.model.GameState state) {
        switch (state) {
            case CREATED:
                return GameState.GAME_STATE_CREATED;
            case IN_PROGRESS:
                return GameState.GAME_STATE_IN_PROGRESS;
            case FINISHED:
                return GameState.GAME_STATE_FINISHED;
            default:
                return GameState.GAME_STATE_UNKNOWN;
        }
    }

    private DomainToEventMapper() {}
}
