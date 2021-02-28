import { GameCreationConfig, JoinGameConfig, PlayerTagOption } from '../../application/types'


export const CREATE_GAME = 'CREATE_GAME'
export const JOIN_GAME = 'JOIN_GAME'

interface CreateGameAction {
  type: typeof CREATE_GAME;
  payload: GameCreationConfig;
}

interface JoinGameAction {
  type: typeof JOIN_GAME;
  payload: JoinGameConfig;
}

export type GameActions = CreateGameAction | JoinGameAction;

export interface GameState {
  playerTagOptions: Array<PlayerTagOption>
}