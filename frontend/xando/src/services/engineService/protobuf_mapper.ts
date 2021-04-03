import {
  Game,
  GameEvent,
  GamePlayer,
  PlayerTag,
  X_TAG,
  O_TAG,
  GameStatus,
  GameStatusState,
  CREATED_STATE,
  IN_PROGRESS_STATE,
  FINISHED_STATE,
  EventType,
  JoinGameEvent,
  MoveEvent,
} from "../../application/types";
import * as Protos from "../../generated/compiled";

const EventProtos = Protos.com.jleoirab.xando.events;

type GameEventMessage = Protos.com.jleoirab.xando.events.GameEvent;
type GameMessage = Protos.com.jleoirab.xando.protos.IGame;
type GamePlayerMessage = Protos.com.jleoirab.xando.protos.IGamePlayer;
type GameBoardMessage = Protos.com.jleoirab.xando.protos.IGameBoard;
type GameStatusMessage = Protos.com.jleoirab.xando.protos.IGameStatus;
type PlayerTagMessage = Protos.com.jleoirab.xando.protos.PlayerTag;
const PlayerTagEnum = Protos.com.jleoirab.xando.protos.PlayerTag;
type GameStateMessage = Protos.com.jleoirab.xando.protos.GameState;
const GameStateEnum = Protos.com.jleoirab.xando.protos.GameState;
type GameBoardCellMessage = Protos.com.jleoirab.xando.protos.GameBoard.GameBoardCell;
const GameBoardCellEnum = Protos.com.jleoirab.xando.protos.GameBoard.GameBoardCell;
type WinLineMessage = Protos.com.jleoirab.xando.protos.IWinLine;

export function toGame(gameMessage: GameMessage): Game {
  return {
    uid: gameMessage.uid,
    id: gameMessage.id,
    gameCreatorPlayerId: gameMessage.gameCreatorPlayerId,
    playerX: toGamePlayer(gameMessage.playerX),
    playerO: toGamePlayer(gameMessage.playerO),
    gameBoard: toGameBoard(gameMessage.gameBoard),
    currentPlayerTurn: toNullablePlayerTag(gameMessage.currentPlayerTurn),
    gameStatus: toGameStatus(gameMessage.gameStatus),
  };
}

export function toGamePlayer(gamePlayerMessage: GamePlayerMessage): GamePlayer | null {
  if (!gamePlayerMessage) return null;

  return {
    id: gamePlayerMessage.playerId,
    playerName: gamePlayerMessage.playerName,
  }
}

export function toGameBoard(gameBoardMessage: GameBoardMessage): Array<PlayerTag | null> {
  return gameBoardMessage.cell.map(cell => {
    switch(cell) {
      case GameBoardCellEnum.X:
        return X_TAG;
      case GameBoardCellEnum.O:
        return O_TAG;
      case GameBoardCellEnum.UNOCCUPIED:
        return null;
      default:
        throw new Error("invalid game board cell provided");
    }
  });
}

export function toPlayerTag(playerTagMessage: PlayerTagMessage): PlayerTag {
  const nullablePlayerTag = toNullablePlayerTag(playerTagMessage);

  if (nullablePlayerTag === null) {
    throw new Error("Invalid player tag provided. It cannot be unknown");
  }

  return nullablePlayerTag;
}

export function toNullablePlayerTag(playerTagMessage: PlayerTagMessage): PlayerTag {
  switch (playerTagMessage) {
    case PlayerTagEnum.PLAYER_TAG_X:
      return X_TAG;
    case PlayerTagEnum.PLAYER_TAG_O:
      return O_TAG;
    default:
      return null;
  }
}

export function toGameStatus(gameStatusMessage: GameStatusMessage): GameStatus {
  return {
    winner: toNullablePlayerTag(gameStatusMessage.winner),
    state: toGameState(gameStatusMessage.state),
    winLine: toWinLine(gameStatusMessage.winLine),
  }
}

export function toWinLine(winLine?: WinLineMessage): Array<number> | null {
  if (!winLine) return null;

  return winLine.cell;
}

export function toGameState(gameStateMessage: GameStateMessage): GameStatusState {
  switch (gameStateMessage) {
    case GameStateEnum.GAME_STATE_CREATED:
      return CREATED_STATE;
    case GameStateEnum.GAME_STATE_IN_PROGRESS:
      return IN_PROGRESS_STATE;
    case GameStateEnum.GAME_STATE_FINISHED:
      return FINISHED_STATE;
    case GameStateEnum.GAME_STATE_UNKNOWN:
      throw new Error("Invalid game state provided");
  }
}

export function toEventType(eventCase: GameEventMessage): EventType {
  switch (eventCase.event) {
    case "joinGameEvent":
      return JoinGameEvent;
    case "moveEvent":
      return MoveEvent;
    default:
      throw new Error("Invalid event type provided");
  }
}

export function toGameEvent(binaryData: Uint8Array): GameEvent {
  const event = EventProtos.GameEvent.decode(binaryData);

  return {
    game: toGame(event.game),
    eventType: toEventType(event),
  }
}
