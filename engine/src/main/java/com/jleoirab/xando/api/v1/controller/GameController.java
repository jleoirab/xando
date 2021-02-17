package com.jleoirab.xando.api.v1.controller;

import com.jleoirab.xando.api.v1.request.CreateGameRequest;
import com.jleoirab.xando.api.v1.request.MakeMoveRequest;
import com.jleoirab.xando.api.v1.resources.ApiError;
import com.jleoirab.xando.api.v1.resources.ApiGame;
import com.jleoirab.xando.domain.errors.GameAlreadyStartedException;
import com.jleoirab.xando.domain.errors.XAndOGameError;
import com.jleoirab.xando.domain.model.Game;
import com.jleoirab.xando.domain.model.Player;
import com.jleoirab.xando.domain.model.PlayerTag;
import com.jleoirab.xando.service.GameService;
import com.jleoirab.xando.service.errors.ServiceException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/** Created by jleoirab on 2021-02-09 */
@RestController
@RequestMapping(value = "/v1/games")
public class GameController {

    private final GameService gameService;

    @Autowired
    GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @Operation(summary = "Create a new game resource")
    @ApiResponses(
            value = {
                @ApiResponse(
                        responseCode = "201",
                        content = {
                            @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = ApiGame.class))
                        }),
                @ApiResponse(
                        responseCode = "400",
                        description = "Error creating game",
                        content = {
                            @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = ApiError.class))
                        }),
            })
    @PostMapping(value = "")
    public ApiGame createGame(@AuthenticationPrincipal Player player, @RequestBody CreateGameRequest gameRequest) {
        if (player == null) {
            throw new ApiException(HttpStatus.FORBIDDEN, "Request forbidden");
        }
        try {
            Game game = gameService.createGame(player);
            return ApiGame.from(game);
        } catch (ServiceException e) {
            throw new ApiException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @Operation(summary = "Join a game")
    @ApiResponses(
            value = {
                    @ApiResponse(
                            responseCode = "201",
                            content = {
                                    @Content(
                                            mediaType = "application/json",
                                            schema = @Schema(implementation = ApiGame.class)
                                    )
                            }
                    ),
                    @ApiResponse(
                            responseCode = "403",
                            description = "Forbidden from joining game.",
                            content = {
                                    @Content(
                                            mediaType = "application/json",
                                            schema = @Schema(implementation = ApiError.class))
                            }),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Error joining game.",
                            content = {
                                    @Content(
                                            mediaType = "application/json",
                                            schema = @Schema(implementation = ApiError.class))
                            }),
            }
    )
    @PostMapping(value = "/{gameId}/join")
    public ApiGame joinGame(@AuthenticationPrincipal Player player, @PathVariable("gameId") String gameId) {
        if (player == null) {
            throw new ApiException(HttpStatus.FORBIDDEN, "Request forbidden");
        }

        try {
            Game game = gameService.joinGame(gameId, player);
            return ApiGame.from(game);
        } catch (GameAlreadyStartedException e) {
            throw new ApiException(HttpStatus.FORBIDDEN, e.getMessage());
        } catch (ServiceException | XAndOGameError  e) {
            throw new ApiException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @Operation(summary = "Make a move.")
    @ApiResponses(
            value = {
                    @ApiResponse(
                            responseCode = "201",
                            content = {
                                    @Content(
                                            mediaType = "application/json",
                                            schema = @Schema(implementation = ApiGame.class)
                                    )
                            }
                    ),
                    @ApiResponse(
                            responseCode = "403",
                            description = "Forbidden from joining game.",
                            content = {
                                    @Content(
                                            mediaType = "application/json",
                                            schema = @Schema(implementation = ApiError.class))
                            }),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Error making move.",
                            content = {
                                    @Content(
                                            mediaType = "application/json",
                                            schema = @Schema(implementation = ApiError.class))
                            }),
            }
    )
    @PostMapping(value = "/{gameId}/moves")
    public ApiGame makeMove(@AuthenticationPrincipal Player player, @PathVariable("gameId") String gameId, @RequestBody MakeMoveRequest moveRequest) {
        if (player == null) {
            throw new ApiException(HttpStatus.FORBIDDEN, "Request forbidden");
        }

        try {
            PlayerTag playerTag = PlayerTag.from(moveRequest.getPlayerTag().toString());
            int cellIndex = moveRequest.getCellIndex();

            Game game = gameService.makeMove(gameId, player, playerTag, cellIndex);
            return ApiGame.from(game);
        } catch (ServiceException | XAndOGameError  e) {
            throw new ApiException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}
