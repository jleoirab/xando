package com.jleoirab.xando.api.v1.controller;

import com.jleoirab.xando.api.v1.request.CreateGameRequest;
import com.jleoirab.xando.api.v1.resources.ApiError;
import com.jleoirab.xando.api.v1.resources.ApiGame;
import com.jleoirab.xando.domain.Game;
import com.jleoirab.xando.service.GameService;
import com.jleoirab.xando.service.errors.GameCreationException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by jleoirab on 2021-02-09
 */
@RestController
@RequestMapping(value = "/v1/game")
public class GameController {

    private final GameService gameService;

    @Autowired
    GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @Operation(summary = "Create a new game resource")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    content = {
                            @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = ApiGame.class)
                            )
            }),
            @ApiResponse(
                    responseCode = "400",
                    description = "Error creating game",
                    content = {
                            @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = ApiError.class)
                            )
                    }),
    })
    @PostMapping(value = "")
    ApiGame createGame(@RequestBody CreateGameRequest gameRequest) {
        try {
            Game game = gameService.createGame(null);
            return ApiGame.from(game);
        } catch (GameCreationException e) {
            throw new ApiException("Could not create game", HttpStatus.BAD_REQUEST);
        }
    }
}
