import { Player } from '../../application/types';
import { UPDATE_PLAYER_INFO, SystemActions } from './types';

export function updatePlayerInfo(player: Player): SystemActions {
  return {
    type: UPDATE_PLAYER_INFO,
    payload: player,
  };
}