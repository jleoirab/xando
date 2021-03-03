import { POST, PUT, BasePath, Header, Path, Body, BaseService, ServiceBuilder, Response } from "ts-retrofit";
import { ApiGame, ApiPlayer, ApiPlayerTag } from "./type";

export interface CreateGameRequest {}

export interface CreatePlayerRequest {
    playerName: string
}



export interface MakeMoveRequest {
    playerTag: ApiPlayerTag;
    cellIndex: number;
}

@BasePath("/v1")
class EngineServiceV1 extends BaseService {
    @POST("/players")
    async createPlayer(@Body createPlayerRequest: CreatePlayerRequest): Promise<Response<ApiPlayer>> { return <Response<ApiPlayer>>{} };

    @POST("/games")
    async createGame(authorization: string, createGameRequest: CreateGameRequest): Promise<Response<ApiGame>> { return <Response<ApiGame>>{} };

    // @PUT("/games/{gameId}")
    // async joinGame(@Header("Authorization") authorization: string, @Path("gameId") gameId: string): Promise<Response<ApiGame>> { return <Response<ApiGame>>{} };

    // @POST("/games/{gameId}/moves")
    // async makeMove(@Header("Authorization") authorization: string, @Path("gameId") gameId: string, @Body makeMoveRequest: MakeMoveRequest): Promise<Response<ApiGame>> { return <Response<ApiGame>>{} };
}


export function createEngineServiceV1(endpoint: string): EngineServiceV1 {
    return new ServiceBuilder()
        .setEndpoint(endpoint)
        .build(EngineServiceV1);
}