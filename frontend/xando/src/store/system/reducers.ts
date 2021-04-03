import {
  SystemState,
  SystemActions,
  UPDATE_PLAYER_INFO,
} from './types';

import { createReducer } from '../util';
import { Player } from '../../application/types';
import { playerJoinedGameAction } from '../game/actions';

const PLAYER_KEY = 'player';

function getPlayerFromLocalStorage(): Player | undefined {
  const str = localStorage.getItem(PLAYER_KEY);

  if (str === null) {
    return undefined;
  }

  return JSON.parse(str);
}

function savePlayerToLocalStorage(player: Player) {
  localStorage.setItem(PLAYER_KEY, JSON.stringify(player));
}

const initialState: SystemState = {
  systemPlayer: getPlayerFromLocalStorage(),
}

function handleUpdatePlayerInfo(state: SystemState, action: SystemActions): SystemState {
  console.log("handling update player info", state, action);
  const systemPlayer = action.payload;
  savePlayerToLocalStorage(systemPlayer)

  return { systemPlayer };
}

export const systemReducer = createReducer<string, SystemState, SystemActions>(initialState, [
  [UPDATE_PLAYER_INFO, handleUpdatePlayerInfo],
]);