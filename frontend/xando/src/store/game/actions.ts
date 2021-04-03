import { ThunkAction } from 'redux-thunk';
import { push } from 'connected-react-router';
import {
  Game,
  Move,
  GameCreationConfig,
  JoinGameConfig,
  GameEventsListener,
  JoinGameEvent,
  MoveEvent,
  GameEvent,
} from '../../application/types'
import { Action } from 'redux';
import { RootState } from '../store';
import {
  CREATE_GAME,
  JOIN_GAME,
  CREATE_GAME_SUCCESS,
  MAKE_MOVE,
  GameActions,
  MAKE_MOVE_SUCCESS,
  GAME_SUBSCRIPTION_SUCCESS,
  LOAD_GAME_SUCCESS,
  PLAYER_JOINED_GAME,
  MOVE_RECEIVED,
  GAME_SUBSCRIPTION_REMOVED,
  LEAVE_GAME,
} from './types'
import { EngineServiceBackedGameService } from '../../services/engineService/engineService';
import { updatePlayerInfo, } from '../system/actions';
import { toEventType } from '../../services/engineService/protobuf_mapper';

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

export function gameSubscriptionSuccess(subscription: GameEventsListener): GameActions {
  return {
    type: GAME_SUBSCRIPTION_SUCCESS,
    payload: subscription,
  }
}

export function gameSubscriptionRemoved(gameSubscription: GameEventsListener): GameActions {
  return {
    type: GAME_SUBSCRIPTION_REMOVED,
    payload: gameSubscription,
  };
}

export function loadGameSuccess(game: Game): GameActions {
  return {
    type: LOAD_GAME_SUCCESS,
    payload: game,
  };
}

export function playerJoinedGameAction(event: GameEvent): GameActions {
  return {
    type: PLAYER_JOINED_GAME,
    payload: event,
  };
}

export function moveReceivedAction(event: GameEvent): GameActions {
  return {
    type: MOVE_RECEIVED,
    payload: event,
  };
}

export function leaveGameAction(): GameActions {
  return {
    type: LEAVE_GAME,
    payload: {},
  }
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

  console.log("Make a move request", game);
}

export const registerJoinGameIntent = (config: JoinGameConfig): GameThunk<void> => async (dispatch, getState) => {
  console.log("joining game");

  dispatch({
    type: JOIN_GAME,
    payload: config,
  })

  dispatch(push(`/games/${config.gameId}/join`));
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

  console.log("Loaded game");
}

export const subscibeToGameEvents = (gameId: string): GameThunk<void> => async (dispatch, getState) => {
  console.log(getState());

  const systemPlayer = getState().system.systemPlayer;

  const subscription = gameService.subscribeToGameEvents(gameId, systemPlayer);

  subscription.onGameEvent(event => {
    console.log("handling game event", event);
    switch(event.eventType) {
      case JoinGameEvent:
        dispatch(playerJoinedGameAction(event));
        break;
      case MoveEvent:
        dispatch(moveReceivedAction(event));
        break;
      default:
        break;
    }
  });

  dispatch(gameSubscriptionSuccess(subscription));
}

export const unsubscribeToGameEvents = (): GameThunk<void> => async (dispatch, getState) => {
  const gameSubscription = getState().game.gameSubscription;

  if (gameSubscription) {
    gameSubscription.disconnect();
    dispatch(gameSubscriptionRemoved(gameSubscription));
  }
}

export const createPlayer = (desiredPlayerName: string): GameThunk<void> => async (dispatch, getState) => {
  const systemPlayer = await gameService.createPlayer(desiredPlayerName);
  dispatch(updatePlayerInfo(systemPlayer));
}

export const joinGame = (gameId: string): GameThunk<void> => async (dispatch, getState) => {
  console.log("Joining game");

  let systemPlayer = getState().system.systemPlayer;

  if (!systemPlayer) {
    throw new Error("There is no system player. Weird");
  }

  const game = await gameService.joingGame(systemPlayer, gameId);

  // dispatch join game success

  dispatch(push(`/games/${game.id}`));
}

export const leaveGame = (): GameThunk<void> => async (dispatch, getState) => {
  console.log("Leave game");
  dispatch(leaveGameAction());
  unsubscribeToGameEvents();
  dispatch(push(`/`));
}