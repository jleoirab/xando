package com.jleoirab.xando.api.v1.controller;

import com.jleoirab.xando.api.v1.request.CreatePlayerRequest;
import com.jleoirab.xando.api.v1.resources.ApiPlayer;
import com.jleoirab.xando.domain.Player;
import com.jleoirab.xando.service.PlayerService;
import com.jleoirab.xando.service.errors.PlayerCreationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by jleoirab on 2021-02-09
 */
@RestController
@RequestMapping(value = "/v1/player")
public class PlayerController {

    private final PlayerService playerService;

    @Autowired
    PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @PostMapping(value = "")
    ResponseEntity<ApiPlayer> createPlayer(@RequestBody CreatePlayerRequest request) {
        try {
            String playerName = request.getPlayerName();

            Player player = playerService.createPlayer(playerName);

            return new ResponseEntity<>(ApiPlayer.from(player), HttpStatus.OK);
        } catch (PlayerCreationException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
