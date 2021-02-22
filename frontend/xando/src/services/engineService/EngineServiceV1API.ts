import { POST, PUT, BasePath, Header, Path, Body, BaseService, ServiceBuilder, Response } from "ts-retrofit";
import { ApiGame, ApiPlayer } from "./type";

export interface CreateGameRequest {}

export interface CreatePlayerRequest {
    playerName: string
}

@BasePath("/v1")
class EngineServiceV1 extends BaseService {
    @POST("/players")
    async createPlayer(@Header("Authorization") authorization: string, @Body createPlayerRequest: CreatePlayerRequest): Promise<Response<ApiPlayer>> { return <Response<ApiPlayer>>{} };

    @POST("/games")
    async createGame(@Header("Authorization") authorization: string, @Body createGameRequest: CreateGameRequest): Promise<Response<ApiGame>> { return <Response<ApiGame>>{} };

    @PUT("/games/{gameId}")
    async joinGame(@Header("Authorization") authorization: string, @Path("gameId") gameId: string): Promise<Response<ApiGame>> { return <Response<ApiGame>>{} };

    @POST("/games/{gameId}/moves")
    async makeMove(@Header("Authorization") authorization: string, @Path("gameId") gameId: string): Promise<Response<ApiGame>> { return <Response<ApiGame>>{} };
}

export function createEngineServiceV1(): EngineServiceV1 {
    return new ServiceBuilder()
        .setEndpoint("http://localhost:8080")
        .build(EngineServiceV1);
}