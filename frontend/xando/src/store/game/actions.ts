import { ThunkAction } from 'redux-thunk';
import { Game, GameCreationConfig, JoinGameConfig } from '../../application/types'
import { Action } from 'redux';
import { RootState } from '../store';
import { CREATE_GAME, JOIN_GAME, CREATE_GAME_SUCCESS, GameActions } from './types'
import { EngineServiceBackedGameService } from '../../services/engineService/engineService';
import { updatePlayerInfo } from '../system/actions';

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

export function joinGame(config: JoinGameConfig): GameActions {
  return {
    type: JOIN_GAME,
    payload: config,
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
}