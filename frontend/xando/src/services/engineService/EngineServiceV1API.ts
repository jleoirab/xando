import axios, {Method} from 'axios';
import { ApiGame, ApiPlayer, ApiPlayerTag } from "./type";

export interface CreateGameRequest {}

export interface CreatePlayerRequest {
    playerName: string
}

const GET: Method = "GET";
const POST: Method = "POST";
const PUT: Method = "PUT";

export interface MakeMoveRequest {
  playerTag: ApiPlayerTag;
  cellIndex: number;
}

interface Endpoint {
  method: Method;
  path: string;
  skipAuthorize?: boolean;
}

const CREATE_PLAYER_ENDPOINT: Endpoint = {
  method: POST,
  path: "/players",
  skipAuthorize: true,
}

const CREATE_GAME_ENDPOINT: Endpoint = {
  method: POST,
  path: "/games",
}

const JOIN_GAME_ENDPOINT: Endpoint = {
  method: PUT,
  path: "/games/{gameId}",
}

const MAKE_MOVE_ENDPOINT: Endpoint = {
  method: POST,
  path: "/games/{gameId}/moves",
}

const BASE_PATH = "/v1"

interface EndpointConfig {
  host: string;
}

interface Request {
  endpoint: Endpoint;
  authorization?: string;
  pathFormatter?(path: string): string;
  data?: any;
}

export interface Response<T> {
  data: T;
}

export class EngineServiceV1 {
  config: EndpointConfig;

  constructor(config: EndpointConfig) {
    this.config = config;
  }

  async createPlayer(createPlayerRequest: CreatePlayerRequest): Promise<Response<ApiPlayer>> {
    return await this.makeRequest({
      endpoint: CREATE_PLAYER_ENDPOINT,
      data: createPlayerRequest,
    });
  };

  async createGame(authorization: string, createGameRequest: CreateGameRequest): Promise<Response<ApiGame>> {
    return await this.makeRequest({
      endpoint: CREATE_GAME_ENDPOINT,
      authorization,
      data: createGameRequest
    });
   };

  async joinGame(authorization: string, gameId: string): Promise<Response<ApiGame>> {
    return await this.makeRequest({
      endpoint: JOIN_GAME_ENDPOINT,
      pathFormatter: path => path.replace("{gameId}", gameId),
      authorization,
    });
   };

  async makeMove(authorization: string, gameId: string, makeMoveRequest: MakeMoveRequest): Promise<Response<ApiGame>> {
    return await this.makeRequest({
      endpoint: MAKE_MOVE_ENDPOINT,
      pathFormatter: path => path.replace("{gameId}", gameId),
      authorization,
      data: makeMoveRequest,
    });
  };

  private async makeRequest<T>(request: Request): Promise<Response<T>> {
    const endpoint = request.endpoint;
    const shouldAuthorize = !!!endpoint.skipAuthorize;
    const baseURL = `${this.config.host}${BASE_PATH}`;
    const url = request.pathFormatter ? request.pathFormatter(endpoint.path) : endpoint.path;
    const method = endpoint.method;
    const data = request.data;

    const headers = {};

    if (shouldAuthorize) {
      headers["Authorization"] = `Bearer ${request.authorization}`;
    }

    console.log(endpoint, shouldAuthorize, headers);

    const response = await axios.request({
      baseURL,
      url,
      method,
      headers,
      data,
    });

    return {
      data: response.data,
    }
  }
}