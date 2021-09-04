import { v4 as uuidv4 } from 'uuid';
import { Game, Move, GameService, Player, GameEventsListener, CREATED_STATE, IN_PROGRESS_STATE, X_TAG, GameEventHandler, O_TAG } from "../../application/types";


export class InMemoryGameService implements GameService {
  private game: Game;

  constructor() {

  }

  async createPlayer(playerName: string): Promise<Player> {
    return {
      uid: uuidv4(),
      id: uuidv4(),
      playerName: playerName,
    };
  }

  async createGame(player: Player): Promise<Game> {
    this.game = {
      uid: uuidv4(),
      id: uuidv4(),
      gameCreatorPlayerId: player.id,
      playerX: {
        id: player.id,
        playerName: player.playerName,
      },
      playerO: {
        id: uuidv4(),
        playerName: `random-player-${uuidv4()}`,
      },
      gameBoard: [null, null, null, null, null, null, null, null, null,],
      currentPlayerTurn: X_TAG,
      gameStatus: {
        state: IN_PROGRESS_STATE,
        winner: null,
        winLine: null,
      },
      revision: 1,
    }

    return this.game;
  }

  async joingGame(player: Player, gameId: string): Promise<Game> {
    this.game = {
      uid: uuidv4(),
      id: uuidv4(),
      gameCreatorPlayerId: player.id,
      playerX: {
        id: uuidv4(),
        playerName: `random-player-${uuidv4()}`,
      },
      playerO: {
        id: player.id,
        playerName: player.playerName,
      },
      gameBoard: [null, null, null, null, null, null, null, null, null,],
      currentPlayerTurn: X_TAG,
      gameStatus: {
        state: IN_PROGRESS_STATE,
        winner: null,
        winLine: null,
      },
      revision: 1,
    }

    return this.game;
  }

  async makeMove(move: Move): Promise<Game> {
    this.game = Object.assign({}, this.game);
    this.game.gameBoard[move.cellIndex] = move.playerTag;
    this.game.currentPlayerTurn = (this.game.currentPlayerTurn === X_TAG) ? O_TAG : X_TAG;

    return this.game;
  }

  async getGame(player: Player, gameId: string): Promise<Game> {
    this.game = {
      uid: uuidv4(),
      id: gameId,
      gameCreatorPlayerId: player.id,
      playerX: {
        id: player.id,
        playerName: player.playerName,
      },
      playerO: {
        id: uuidv4(),
        playerName: `random-player-${uuidv4()}`,
      },
      gameBoard: [null, null, null, X_TAG, null, null, O_TAG, null, null,],
      currentPlayerTurn: X_TAG,
      gameStatus: {
        state: IN_PROGRESS_STATE,
        winner: null,
        winLine: null,
      },
      revision: 1,
    }

    return this.game;
  }

  subscribeToGameEvents(gameId: string, player: Player): GameEventsListener {
    return new NoopGameEventsListener();
  }

}

class NoopGameEventsListener implements GameEventsListener {
  disconnect(): void {
    // do nothing.
  }
  onGameEvent(handler: GameEventHandler): void {
    // do nothing
  }

}