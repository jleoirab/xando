package com.jleoirab.xando.api.v1.controller;

import com.jleoirab.xando.api.v1.resources.ApiGame;
import com.jleoirab.xando.domain.Game;
import com.jleoirab.xando.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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

    @GetMapping(value = "/new")
    ApiGame createGame() {
        Game game = gameService.createGame(null);

        return ApiGame.from(game);
    }
}
