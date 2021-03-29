import { Client, Message, StompSubscription } from '@stomp/stompjs';

import { toGameEvent } from './protobuf_mapper';
import {  Player, GameEventsListener, GameEventHandler } from "../../application/types";


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
  private gameId: string;
  private player: Player;
  private handler: GameEventHandler;

  constructor(client: Client, gameId: string, player: Player) {
    this.client = client;
    this.gameId = gameId;
    this.player = player;
    this.handleGameEvent = this.handleGameEvent.bind(this);

    this.subscribe();
  }

  private subscribe(): void {

    this.client.onConnect = frame => {
      this.client.subscribe(`/queue/${this.gameId}`, this.handleGameEvent);
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

    this.handler(toGameEvent(message.binaryBody));
  }

}