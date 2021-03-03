import { Player } from "../../application/types";
import { ApiPlayer } from "./type";

export function toPlayer(apiPlayer: ApiPlayer): Player {
  return {
    uid: apiPlayer.uid,
    id: apiPlayer.id,
    playerName: apiPlayer.playerName,
  }
}