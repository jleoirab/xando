import { Game, GameCreationConfig, GameEvent, GameEventsListener, JoinGameConfig, Move, PlayerTagOption } from '../../application/types'


export const CREATE_GAME = 'CREATE_GAME';
export const CREATE_GAME_SUCCESS = 'CREATE_GAME_SUCCESS';
export const LOAD_GAME = 'LOAD_GAME';
export const LOAD_GAME_SUCCESS = 'LOAD_GAME_SUCCESS';
export const JOIN_GAME = 'JOIN_GAME';
export const MAKE_MOVE = 'MAKE_MOVE';
export const MAKE_MOVE_SUCCESS = 'MAKE_MOVE_SUCCESS';
export const GAME_SUBSCRIPTION_SUCCESS = 'GAME_SUBSCRIPTION_SUCCESS';
export const PLAYER_JOINED_GAME = 'PLAYER_JOINED_GAME';
export const MOVE_RECEIVED = 'MOVE_RECEIVED';
export const GAME_SUBSCRIPTION_REMOVED = 'GAME_SUBSCRIPTION_REMOVED';
export const LEAVE_GAME = 'LEAVE_GAME';

interface CreateGameAction {
  type: typeof CREATE_GAME;
  payload: GameCreationConfig;
}

interface CreateGameSuccessAction {
  type: typeof CREATE_GAME_SUCCESS;
  payload: Game;
}

interface LoadGameAction {
  type: typeof LOAD_GAME;
  payload: string;
}

export interface LoadGameSuccessAction {
  type: typeof LOAD_GAME_SUCCESS;
  payload: Game;
}

interface JoinGameAction {
  type: typeof JOIN_GAME;
  payload: JoinGameConfig;
}

interface MakeMoveAction {
  type: typeof MAKE_MOVE;
  payload: Move;
}

interface MoveMoveSuccessAction {
  type: typeof MAKE_MOVE_SUCCESS;
  payload: Game;
}

interface GameSubscriptionSuccessAction {
  type: typeof GAME_SUBSCRIPTION_SUCCESS;
  payload: GameEventsListener;
}

interface PlayerJoinedGameAction {
  type: typeof PLAYER_JOINED_GAME;
  payload: GameEvent;
}

interface MoveReceivedAction {
  type: typeof MOVE_RECEIVED;
  payload: GameEvent;
}

interface GameSubscriptionRemovedAction {
  type: typeof GAME_SUBSCRIPTION_REMOVED;
  payload: GameEventsListener;
}

interface LeaveGameAction {
  type: typeof LEAVE_GAME;
  payload: any;
}

export type GameActions = CreateGameAction | CreateGameSuccessAction | JoinGameAction | MakeMoveAction
  | MoveMoveSuccessAction | GameSubscriptionSuccessAction | LoadGameAction | LoadGameSuccessAction
  | PlayerJoinedGameAction | MoveReceivedAction | GameSubscriptionRemovedAction | LeaveGameAction;

export interface GameState {
  playerTagOptions: Array<PlayerTagOption>
  currentGame?: Game;
  gameSubscription?: GameEventsListener;
}