export interface ApiGame {
    uid: string;
    id: string;
    gameCreatorPlayerId: string;
    playerX: ApiGamePlayer;
    playerO: ApiGamePlayer | null;
    gameBoard: Array<ApiPlayerTag | null>;
    currentPlayerTurn: ApiPlayerTag | null;
    gameStatus: ApiGameStatus
}

export interface ApiPlayer {
    uid: string;
    id: string;
    playerName: string;
}

export interface ApiGamePlayer {
    id: string;
    playerName: string;
}

export interface ApiGameStatus {
    state: ApiGameState;
    winner: ApiPlayerTag | null;
    winLine: Array<number> | null;
}

export type ApiPlayerTag = "X" | "O";

export type ApiGameState = "CREATED" | "IN_PROGRESS" | "FINISHED";