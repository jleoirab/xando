package com.jleoirab.xando.api.v1.controller;

import com.jleoirab.xando.api.v1.request.CreateGameRequest;
import com.jleoirab.xando.api.v1.resources.ApiError;
import com.jleoirab.xando.api.v1.resources.ApiGame;
import com.jleoirab.xando.domain.Game;
import com.jleoirab.xando.domain.Player;
import com.jleoirab.xando.service.GameService;
import com.jleoirab.xando.service.errors.GameCreationException;
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
@RequestMapping(value = "/v1/game")
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
    @GetMapping(value = "") // TODO: For debugging on the browser. Should remove once custom error controller has been added
    public ApiGame createGame(@AuthenticationPrincipal Player player, @RequestBody CreateGameRequest gameRequest) {
        if (player == null) {
            throw new ApiException(HttpStatus.FORBIDDEN, "Request forbidden");
        }
        try {
            Game game = gameService.createGame(player);
            return ApiGame.from(game);
        } catch (GameCreationException e) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Could not create game");
        }
    }
}
