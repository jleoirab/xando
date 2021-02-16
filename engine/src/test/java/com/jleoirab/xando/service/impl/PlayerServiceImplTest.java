package com.jleoirab.xando.service.impl;

import com.jleoirab.xando.domain.Player;
import com.jleoirab.xando.repository.PlayerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

/** Created by jleoirab on 2021-02-12 */
@ExtendWith(MockitoExtension.class)
class PlayerServiceImplTest {
    // Static variable declaration
    private static final String PLAYER_NAME = "player-name";
    private static final Player PLAYER = Player.builder()
            .playerName(PLAYER_NAME)
            .build();

    // System under test
    private PlayerServiceImpl sut;

    // Collaborators
    @Mock
    PlayerRepository playerRepository;

    // Helpers
    @BeforeEach
    void setup() {
        sut = new PlayerServiceImpl(playerRepository);
    }

    @Test
    void test_Given_Player_When_CreateGame_then_ShouldCreateGame() {
        when(playerRepository.save(any(Player.class))).thenReturn(PLAYER);
        Player player = sut.createPlayer(PLAYER_NAME);
        assertEquals(PLAYER_NAME, player.getPlayerName());
    }
}
