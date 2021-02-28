import { Player } from '../../application/types';


export const UPDATE_PLAYER_INFO = 'UPDATE_PLAYER_INFO'

interface UpdatePlayerInfoAction {
  type: typeof UPDATE_PLAYER_INFO;
  payload: Player;
}

export type SystemActions = UpdatePlayerInfoAction;

export interface SystemState {
  systemPlayer?: Player;
}