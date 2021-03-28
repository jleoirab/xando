import { Client, Message, StompSubscription } from '@stomp/stompjs';

import { toPlayer, toGame, toApiPlayerTag } from './mapper';
import { Game, Move, GameService, Player, GameEvent, GameEventsListener, GameEventHandler } from "../../application/types";
import { ApiPlayer, ApiGame } from './type';


const WEB_SOCKET_ENDPOINT = "ws://localhost:8082/ws";

export const createStompClient = () => {
  const client = new Client({
    brokerURL: WEB_SOCKET_ENDPOINT,
    debug: console.log,
  });

  return client;
}

export class WebSocketGameEventsListener implements GameEventsListener {
  private client: Client;
  private subscription: StompSubscription
  private game: Game;
  private player: Player;
  private handler: GameEventHandler;

  constructor(client: Client, game: Game, player: Player) {
    this.client = client;
    this.game = game;
    this.player = player;
    this.handleGameEvent = this.handleGameEvent.bind(this);

    this.subscribe();
  }

  private subscribe(): void {

    this.client.onConnect = frame => {
      this.client.subscribe(`/queue/${this.game.id}`, this.handleGameEvent);
    }

    this.client.activate();
  }

  disconnect(): void {
    this.subscription.unsubscribe();
  }

  onGameEvent(handler: GameEventHandler): void {
    this.handler = handler;
  }

  private handleGameEvent(message: Message): void {
    console.log("Received message", message);

    if (this.handler === undefined) return;

    // convert proto to frontend domain representation.
    console.log("Call the handler with the protobuf gen gen.");
  }

}