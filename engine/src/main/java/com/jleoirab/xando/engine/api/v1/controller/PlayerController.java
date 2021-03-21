package com.jleoirab.xando.engine.api.v1.controller;

import com.jleoirab.xando.engine.api.v1.request.CreatePlayerRequest;
import com.jleoirab.xando.engine.api.v1.resources.ApiError;
import com.jleoirab.xando.engine.api.v1.resources.ApiPlayer;
import com.jleoirab.xando.engine.domain.model.Player;
import com.jleoirab.xando.engine.service.PlayerService;
import com.jleoirab.xando.engine.service.errors.ServiceException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

/** Created by jleoirab on 2021-02-09 */
@RestController
@RequestMapping(value = "/v1/players")
public class PlayerController {

    private final PlayerService playerService;

    @Autowired
    PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @Operation(summary = "Create a new player resource")
    @ApiResponses(
            value = {
                @ApiResponse(
                        responseCode = "201",
                        content = {
                            @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = ApiPlayer.class))
                        }),
                @ApiResponse(
                        responseCode = "400",
                        description = "Error creating player",
                        content = {
                            @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = ApiError.class))
                        }),
            })
    @PostMapping(value = "")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiPlayer createPlayer(@RequestBody CreatePlayerRequest request) {
        try {
            String playerName = request.getPlayerName();

            Player player = playerService.createPlayer(playerName);

            return ApiPlayer.from(player);
        } catch (ServiceException e) {
            throw new ApiException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}
