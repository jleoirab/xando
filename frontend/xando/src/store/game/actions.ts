import { ThunkAction } from 'redux-thunk';
import { push } from 'connected-react-router';
import { Game, Move, GameCreationConfig, JoinGameConfig, GameEventsListener } from '../../application/types'
import { Action } from 'redux';
import { RootState } from '../store';
import { CREATE_GAME, JOIN_GAME, CREATE_GAME_SUCCESS, MAKE_MOVE, GameActions, MAKE_MOVE_SUCCESS, GAME_SUBSCRIPTION_SUCCESS, LOAD_GAME_SUCCESS } from './types'
import { EngineServiceBackedGameService } from '../../services/engineService/engineService';
import { updatePlayerInfo, } from '../system/actions';

export function createGame(config: GameCreationConfig): GameActions {
  return {
    type: CREATE_GAME,
    payload: config,
  };
}

export function createGameSuccess(game: Game): GameActions {
  return {
    type: CREATE_GAME_SUCCESS,
    payload: game,
  }
}

export function makeMove(move: Move): GameActions {
  return {
    type: MAKE_MOVE,
    payload: move,
  }
}

export function makeMoveSuccess(game: Game): GameActions {
  return {
    type: MAKE_MOVE_SUCCESS,
    payload: game,
  }
}

export function joinGame(config: JoinGameConfig): GameActions {
  return {
    type: JOIN_GAME,
    payload: config,
  };
}

export function gameSubscriptionSuccess(subscription: GameEventsListener): GameActions {
  return {
    type: GAME_SUBSCRIPTION_SUCCESS,
    payload: subscription,
  }
}

export function loadGameSuccess(game: Game): GameActions {
  return {
    type: LOAD_GAME_SUCCESS,
    payload: game,
  };
}

export type GameThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

const gameService = new EngineServiceBackedGameService();

export const callCreateGame = (config: GameCreationConfig): GameThunk<void> => async (dispatch, getState) => {
  console.log("Doing callCreateGame thunk");

  dispatch(createGame(config));

  let systemPlayer = getState().system.systemPlayer;

  const desiredPlayerName = config.playerName;

  if (systemPlayer?.playerName !== desiredPlayerName) {
    systemPlayer = await gameService.createPlayer(desiredPlayerName);
    dispatch(updatePlayerInfo(systemPlayer));
  }

  const game = await gameService.createGame(systemPlayer);

  dispatch(createGameSuccess(game));

  dispatch(push(`/games/${game.id}`));

  // redirect to game page
}

export const callMakeMove = (move: Move): GameThunk<void> => async (dispatch, getState) => {
  console.log("Doing callMakeMove thunk");

  dispatch(makeMove(move));

  const game = await gameService.makeMove(move);

  dispatch(makeMoveSuccess(game));

  console.log("Make a move request");
}

export const loadGame = (gameId: string): GameThunk<void> => async (dispatch, getState) => {
  console.log("Loading game");

  console.log(getState());

  const systemPlayer = getState().system.systemPlayer;

  if (!systemPlayer) {
    throw new Error("There is no system player. Weird");
  }

  const game = await gameService.getGame(systemPlayer, gameId);

  if (!game) {
    throw new Error("There is no game. Weird");
  }

  console.log(game);

  dispatch(loadGameSuccess(game));

  const subscription = gameService.subscribeToGameEvents(game, systemPlayer);

  subscription.onGameEvent(event => {
    console.log("handling game event", event);
  });

  dispatch(gameSubscriptionSuccess(subscription));

  console.log("Loaded game");
}