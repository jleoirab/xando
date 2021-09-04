import { ApiGamePlayer, ApiGameStatus } from "../services/engineService/type";
import { GameState } from "../store/game/types";

export enum PlayerTagSelection {
  RANDOM,
  X,
  O,
}

export enum OpponentType {
  AI,
  NOT_AI,
}

export interface PlayerTagOption {
  label: string;
  value: PlayerTagSelection;
}

export const PLAYER_TAG_OPTIONS = [
  {
    label: "Random",
    value: PlayerTagSelection.RANDOM,
  },
  {
    label: "X",
    value: PlayerTagSelection.X,
  },
  {
    label: "O",
    value: PlayerTagSelection.O,
  },
];

export interface GameConfigOptions {
  playerName: string;
}

export interface GameCreationConfig extends GameConfigOptions {
  desiredPlayerTag: PlayerTagSelection;
}

export interface JoinGameConfig extends GameConfigOptions {
  gameId: string;
}


export type PlayerTag = string;

export const X_TAG: PlayerTag = "X";
export const O_TAG: PlayerTag = "O";

export interface Player {
  uid: string;
  id: string;
  playerName: string;
}

export interface GamePlayer {
  id: string;
  playerName: string;
}

export type GameStatusState = string;

export const CREATED_STATE: GameStatusState = "CREATED"
export const IN_PROGRESS_STATE: GameStatusState = "IN_PROGRESS"
export const FINISHED_STATE: GameStatusState = "FINISHED"

export interface GameStatus {
  state: GameStatusState;
  winner: PlayerTag | null;
  winLine: Array<number> | null;
}

export interface Game {
  uid: string;
  id: string;
  gameCreatorPlayerId: string;
  playerX: GamePlayer;
  playerO: GamePlayer | null;
  gameBoard: Array<PlayerTag | null>;
  currentPlayerTurn: PlayerTag;
  gameStatus: GameStatus;
  revision: number;
}

export interface Move {
  gameId: string;
  player: GamePlayer;
  playerTag: PlayerTag;
  cellIndex: number;
}

export type EventType = string

export const JoinGameEvent: EventType = "JoinGameEvent";
export const MoveEvent: EventType = "MoveEvent";

export interface GameEvent {
  game: Game;
  eventType: EventType;
}

export interface GameEventHandler {
  (event: GameEvent): void;
}

export interface GameEventsListener {
  disconnect(): void;
  onGameEvent(handler: GameEventHandler): void;
}

export interface OnConnectHandler {
  (): void;
}

export interface GameService {
  createPlayer(playerName: string): Promise<Player>;
  createGame(player: Player): Promise<Game>;
  joingGame(player: Player, gameId: string): Promise<Game>;
  makeMove(move: Move): Promise<Game>;
  subscribeToGameEvents(gameId: string, player: Player, onConnect: OnConnectHandler): GameEventsListener;
  getGame(player: Player, gameId: string): Promise<Game>;
}