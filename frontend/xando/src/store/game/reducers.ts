import {
  GameState,
  GameActions,
  CREATE_GAME,
  JOIN_GAME,
  CREATE_GAME_SUCCESS,
} from './types';

import { createReducer } from '../util';
import { PLAYER_TAG_OPTIONS } from '../../application/types';


const initialState: GameState = {
  playerTagOptions: PLAYER_TAG_OPTIONS,
}

function handleCreateGame(state: GameState, action: GameActions): GameState {
  console.log("handling create game", state, action);
  return state;
}

function handleCreateGameSuccess(state: GameState, action: GameActions): GameState {
  console.log("handling create game success", state, action);
  return state;
}

function handleJoinGame(state: GameState, action: GameActions): GameState {
  console.log("handling join game", state, action);
  return state;
}

export const gameReducer = createReducer<string, GameState, GameActions>(initialState, [
  [CREATE_GAME, handleCreateGame],
  [CREATE_GAME_SUCCESS, handleCreateGameSuccess],
  [JOIN_GAME, handleJoinGame],
]);