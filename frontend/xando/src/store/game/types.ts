import { Game, GameCreationConfig, JoinGameConfig, PlayerTagOption } from '../../application/types'


export const CREATE_GAME = 'CREATE_GAME';
export const CREATE_GAME_SUCCESS = 'CREATE_GAME_SUCCESS';
export const JOIN_GAME = 'JOIN_GAME';

interface CreateGameAction {
  type: typeof CREATE_GAME;
  payload: GameCreationConfig;
}

interface CreateGameSuccessAction {
  type: typeof CREATE_GAME_SUCCESS;
  payload: Game;
}

interface JoinGameAction {
  type: typeof JOIN_GAME;
  payload: JoinGameConfig;
}

export type GameActions = CreateGameAction | CreateGameSuccessAction | JoinGameAction;

export interface GameState {
  playerTagOptions: Array<PlayerTagOption>
}