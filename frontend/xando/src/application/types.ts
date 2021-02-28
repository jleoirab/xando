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