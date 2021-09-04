import { Client, Message, StompSubscription } from '@stomp/stompjs';

import { toGameEvent } from './protobuf_mapper';
import {  Player, GameEventsListener, GameEventHandler } from "../../application/types";


const WEB_SOCKET_ENDPOINT = "ws://192.168.2.28:8082/ws";

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
  private onConnectHandler: () => void;

  constructor(client: Client, gameId: string, player: Player, onConnect: () => void) {
    this.client = client;
    this.gameId = gameId;
    this.player = player;
    this.onConnectHandler = onConnect;

    this.handleGameEvent = this.handleGameEvent.bind(this);
    this.handleNewConnection = this.handleNewConnection.bind(this);

    this.subscribe();
  }

  private subscribe(): void {

    this.client.onConnect = frame => {
      this.handleNewConnection();
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

  private handleNewConnection(): void {
    this.onConnectHandler();
  }

  private handleGameEvent(message: Message): void {
    console.log("Received message", message);

    if (this.handler === undefined) return;

    this.handler(toGameEvent(message.binaryBody));
  }

}