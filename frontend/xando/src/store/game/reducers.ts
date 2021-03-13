import {
  GameState,
  GameActions,
  CREATE_GAME,
  JOIN_GAME,
  CREATE_GAME_SUCCESS,
  MAKE_MOVE,
  MAKE_MOVE_SUCCESS,
} from './types';

import { createReducer } from '../util';
import { IN_PROGRESS_STATE, PLAYER_TAG_OPTIONS, X_TAG, O_TAG } from '../../application/types';


const initialState: GameState = {
  playerTagOptions: PLAYER_TAG_OPTIONS,
  currentGame: {
    uid: "uid",
    id: "id",
    gameCreatorPlayerId: "gameCreator",
    playerX: {
      id: "id-x",
      playerName: "gameCreator",
    },
    playerO: {
      id: "id-o",
      playerName: "gameParticipant",
    },
    gameBoard: [null, X_TAG, null, null, X_TAG, null, O_TAG, null, null,],
    currentPlayerTurn: O_TAG,
    gameStatus: {
      state: IN_PROGRESS_STATE,
      winner: null,
    }
  }
}

function handleCreateGame(state: GameState, action: GameActions): GameState {
  console.log("handling create game", state, action);
  return state;
}

function handleCreateGameSuccess(state: GameState, action: GameActions): GameState {
  console.log("handling create game success", state, action);
  return Object.assign({}, state, {
    game: action.payload,
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
    game: action.payload,
  });
}
export const gameReducer = createReducer<string, GameState, GameActions>(initialState, [
  [CREATE_GAME, handleCreateGame],
  [CREATE_GAME_SUCCESS, handleCreateGameSuccess],
  [JOIN_GAME, handleJoinGame],
  [MAKE_MOVE, handleMakeMove],
  [MAKE_MOVE_SUCCESS, handleMakeMoveSuccess],
]);