import {
  SystemState,
  SystemActions,
  UPDATE_PLAYER_INFO,
} from './types';

import { createReducer } from '../util';


const initialState: SystemState = {

}

function handleUpdatePlayerInfo(state: SystemState, action: SystemActions): SystemState {
  console.log("handling update player info", state, action);
  return state;
}

export const systemReducer = createReducer<string, SystemState, SystemActions>(initialState, [
  [UPDATE_PLAYER_INFO, handleUpdatePlayerInfo],
]);