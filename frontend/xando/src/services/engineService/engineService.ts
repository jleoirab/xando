import { toPlayer } from './mapper';
import { Game, GameService, Player } from "../../application/types";
import { createEngineServiceV1 } from "./EngineServiceV1API";

const ENDPOINT = "http://localhost:8080";

export class EngineServiceBackedGameService implements GameService {
  private engineService;

  constructor(endpoint = ENDPOINT) {
    this.engineService = createEngineServiceV1(endpoint);
  }

  async createPlayer(playerName: string): Promise<Player> {
    // const response = await this.engineService.createPlayer({
    //   playerName: playerName,
    // });

   return toPlayer({
     id: "id",
     uid: "uid",
     playerName: playerName,
   });
  }

  async createGame(player: Player): Promise<Game> {
    throw new Error("Method not implemented.");
  }

  async joingGame(player: Player): Promise<Game> {
    throw new Error("Method not implemented.");
  }

  async makeMove(game: Game, player: Player, cellIndex: number): Promise<Game> {
    throw new Error("Method not implemented.");
  }

}