import {
  GameState,
  GameActions,
  CREATE_GAME,
  JOIN_GAME,
  CREATE_GAME_SUCCESS,
  MAKE_MOVE,
  MAKE_MOVE_SUCCESS,
  LOAD_GAME_SUCCESS,
  PLAYER_JOINED_GAME,
  MOVE_RECEIVED,
} from './types';

import { createReducer } from '../util';
import { IN_PROGRESS_STATE, PLAYER_TAG_OPTIONS, X_TAG, O_TAG, GameEvent } from '../../application/types';


const initialState: GameState = {
  playerTagOptions: PLAYER_TAG_OPTIONS,
}

function handleCreateGame(state: GameState, action: GameActions): GameState {
  console.log("handling create game", state, action);
  return state;
}

function handleCreateGameSuccess(state: GameState, action: GameActions): GameState {
  console.log("handling create game success", state, action);
  return Object.assign({}, state, {
    currentGame: action.payload,
  });
}

function handleJoinGame(state: GameState, action: GameActions): GameState {
  console.log("handling join game", state, action);
  return state;
}

function handleMakeMove(state: GameState, action: GameActions): GameState {
  console.log("handling make move", state, action);
  return state;
}

function handleMakeMoveSuccess(state: GameState, action: GameActions): GameState {
  console.log("handling make  move success");
  return Object.assign({}, state, {
    currentGame: action.payload,
  });
}

function handleLoadGameSuccess(state: GameState, action: GameActions): GameState {
  console.log("handling load game success");
  const newState = Object.assign({}, state, {
    currentGame: action.payload,
  });

  console.log("new state", newState);

  return newState;
}

function handlePlayerJoinedGame(state: GameState, action: GameActions): GameState {
  console.log("handling player joined game action");
  const game = (action.payload as GameEvent).game;

  return Object.assign({}, state, {
    currentGame: game,
  });
}

function handleMoveReceived(state: GameState, action: GameActions): GameState {
  console.log("handling move received action");
  const game = (action.payload as GameEvent).game;

  return Object.assign({}, state, {
    currentGame: game,
  });
}

export const gameReducer = createReducer<string, GameState, GameActions>(initialState, [
  [CREATE_GAME, handleCreateGame],
  [CREATE_GAME_SUCCESS, handleCreateGameSuccess],
  [JOIN_GAME, handleJoinGame],
  [MAKE_MOVE, handleMakeMove],
  [MAKE_MOVE_SUCCESS, handleMakeMoveSuccess],
  [LOAD_GAME_SUCCESS, handleLoadGameSuccess],
  [PLAYER_JOINED_GAME, handlePlayerJoinedGame],
  [MOVE_RECEIVED, handleMoveReceived],
]);