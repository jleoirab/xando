export enum PlayerTagSelection {
  RANDOM,
  X,
  O,
}

export interface PlayerTagOption {
  label: string;
  value: PlayerTagSelection;
}

export const PLAYER_TAG_OPTIONS = [
  {
    label: "Random",
    value: PlayerTagSelection.RANDOM,
  },
  {
    label: "X",
    value: PlayerTagSelection.X,
  },
  {
    label: "O",
    value: PlayerTagSelection.O,
  },
];

export interface GameConfigOptions {
  playerName: string;
}

export interface GameCreationConfig extends GameConfigOptions {
  desiredPlayerTag: PlayerTagSelection;
}

export interface JoinGameConfig extends GameConfigOptions {
  // gameId: string;
}

export interface Player {
  uid: string;
  id: string;
  playerName: string;
}

export interface Game {

}

export interface GameService {
  createPlayer(playerName: string): Promise<Player>;
  createGame(player: Player): Promise<Game>;
  joingGame(player: Player): Promise<Game>;
  makeMove(game: Game, player: Player, cellIndex: number): Promise<Game>;
}