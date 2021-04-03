import { Player, Game, GamePlayer, PlayerTag, GameStatus, GameStatusState} from "../../application/types";
import { ApiGame, ApiGamePlayer, ApiGameState, ApiGameStatus, ApiPlayer, ApiPlayerTag } from "./type";

export function toPlayer(apiPlayer: ApiPlayer): Player {
  return {
    uid: apiPlayer.uid,
    id: apiPlayer.id,
    playerName: apiPlayer.playerName,
  }
}

export function toGame(apiGame: ApiGame): Game {
  return {
    uid: apiGame.uid,
    id: apiGame.id,
    gameCreatorPlayerId: apiGame.gameCreatorPlayerId,
    playerX: toGamePlayer(apiGame.playerX),
    playerO: toGamePlayer(apiGame.playerO),
    gameBoard: toGameBoard(apiGame.gameBoard),
    currentPlayerTurn: toPlayerTag(apiGame.currentPlayerTurn),
    gameStatus: toGameStatus(apiGame.gameStatus),
  }
}

export function toGamePlayer(apiGamePlayer?: ApiGamePlayer): GamePlayer | null {
  if (!apiGamePlayer) {
    return null;
  }

  return {
    id: apiGamePlayer.id,
    playerName: apiGamePlayer.playerName,
  }
}

export function toGameBoard(board: Array<ApiPlayerTag | null>): Array<PlayerTag | null> {
  return board.map(cell => {
    if (cell === null) return null;
    return toPlayerTag(cell);
  });
}

export function toPlayerTag(apiPlayerTag: ApiPlayerTag): PlayerTag {
  return <PlayerTag>apiPlayerTag;
}

export function toApiPlayerTag(playerTag: PlayerTag): ApiPlayerTag {
  return <ApiPlayerTag>playerTag;
}

export function toGameStatus(apiGameStatus: ApiGameStatus): GameStatus {
  return {
    winner: apiGameStatus.winner ? toPlayerTag(apiGameStatus.winner) : null,
    state: toStatusState(apiGameStatus.state),
    winLine: apiGameStatus.winLine,
  }
}

export function toStatusState(apiGameState: ApiGameState): GameStatusState {
  return <GameStatusState>apiGameState;
}
