import axios from 'axios';

import { toPlayer, toGame } from './mapper';
import { Game, GameService, Player } from "../../application/types";
import { EngineServiceV1, Response } from "./EngineServiceV1API";
import { ApiPlayer, ApiGame } from './type';


const ENDPOINT = "http://localhost:8080";

export class EngineServiceBackedGameService implements GameService {
  private engineService: EngineServiceV1;

  constructor(endpoint = ENDPOINT) {
    this.engineService = new EngineServiceV1({
      host: endpoint,
    });
  }

  async createPlayer(playerName: string): Promise<Player> {
    const response: Response<ApiPlayer> = await this.engineService.createPlayer({
      playerName: playerName,
    });

   return toPlayer(response.data);
  }

  async createGame(player: Player): Promise<Game> {
    const authorization = `${player.playerName}:${player.id}`;
    const response: Response<ApiGame> = await this.engineService.createGame(authorization, {});

    return toGame(response.data);
  }

  async joingGame(player: Player): Promise<Game> {
    throw new Error("Method not implemented.");
  }

  async makeMove(game: Game, player: Player, cellIndex: number): Promise<Game> {
    throw new Error("Method not implemented.");
  }

}