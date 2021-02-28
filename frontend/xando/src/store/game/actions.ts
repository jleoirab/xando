import { GameCreationConfig, JoinGameConfig } from '../../application/types'
import { CREATE_GAME, JOIN_GAME, GameActions } from './types'

export function createGame(config: GameCreationConfig): GameActions {
  return {
    type: CREATE_GAME,
    payload: config,
  };
}

export function joinGame(config: JoinGameConfig): GameActions {
  return {
    type: JOIN_GAME,
    payload: config,
  };
}