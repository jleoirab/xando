package com.jleoirab.xando.service.impl;

import com.jleoirab.xando.domain.*;
import com.jleoirab.xando.repository.GameRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/** Created by jleoirab on 2021-02-12 */
@ExtendWith(MockitoExtension.class)
class GameServiceImplTest {
    // Static variable declaration
    private final Player PLAYER_X = Player.builder().playerId("player-id").playerName("player-x").build();

    // System under test
    private GameServiceImpl sut;

    // Collaborators
    @Mock
    private GameRepository gameRepository;

    // Helpers
    @BeforeEach
    void setup() {
        sut = new GameServiceImpl(gameRepository);
    }

    @Test
    void test_Given_Player_When_CreateGame_then_ShouldCreateGame() {
        when(gameRepository.save(any(Game.class))).thenAnswer(i -> i.getArgument(0));

        Game game = sut.createGame(PLAYER_X);

        verify(gameRepository).save(any(Game.class));
        assertEquals(GamePlayer.from(PLAYER_X), game.getPlayerX());
        assertNull(game.getPlayerO());
        assertEquals(",,,,,,,,", game.getGameBoard());
        assertEquals(PlayerTag.PLAYER_X, game.getGameStatus().getCurrentPlayerTurn());
        assertNull(game.getGameStatus().getWinner());
        assertEquals(GameState.CREATED, game.getGameStatus().getState());
    }
}
