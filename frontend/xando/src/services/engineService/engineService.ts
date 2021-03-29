import axios from 'axios';
import { Client, Message, StompSubscription } from '@stomp/stompjs';

import { toPlayer, toGame, toApiPlayerTag } from './mapper';
import { Game, Move, GameService, Player, GameEvent, GameEventsListener, GameEventHandler } from "../../application/types";
import { EngineServiceV1, Response } from "./EngineServiceV1API";
import { ApiPlayer, ApiGame } from './type';
import { createStompClient, WebSocketGameEventsListener } from './websocketTransport';


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
    const authorization = this.getAuthorization(player.id, player.playerName);
    const response: Response<ApiGame> = await this.engineService.createGame(authorization, {});
    return toGame(response.data);
  }

  async joingGame(player: Player, gameId: string): Promise<Game> {
    const authorization = this.getAuthorization(player.id, player.playerName);
    const response: Response<ApiGame> = await this.engineService.joinGame(authorization, gameId);
    return toGame(response.data);
  }

  async makeMove(move: Move): Promise<Game> {
    const authorization = this.getAuthorization(move.player.id, move.player.playerName);
    const response: Response<ApiGame> = await this.engineService.makeMove(authorization, move.gameId, {
      playerTag: toApiPlayerTag(move.playerTag),
      cellIndex: move.cellIndex,
    });

    return toGame(response.data);
  }

  async getGame(player: Player, gameId: string): Promise<Game> {
    const authorization = this.getAuthorization(player.id, player.playerName);
    const response: Response<ApiGame> = await this.engineService.getGame(authorization, gameId);

    return toGame(response.data);
  }

  subscribeToGameEvents(gameId: string, player: Player): GameEventsListener {
    const client = createStompClient();
    return new WebSocketGameEventsListener(client, gameId, player);
  }

  private getAuthorization(id: string, playerName: string) {
    return `${playerName}:${id}`;
  }

}