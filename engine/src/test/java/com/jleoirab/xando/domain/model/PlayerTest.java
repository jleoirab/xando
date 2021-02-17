package com.jleoirab.xando.domain.model;

import com.jleoirab.xando.domain.errors.XAndOGameError;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.verify;

/**
 * Created by jleoirab on 2021-02-17
 */
@ExtendWith(MockitoExtension.class)
class PlayerTest {
    // Static variable declaration

    // System under test
    private Player sut;

    // Collaborators
    @Mock
    Game game;

    // Helpers
    @BeforeEach
    void setup() {
        sut = Player.builder()
                .playerId("player-id")
                .playerName("player-name")
                .build();
    }

    @Test
    void test_Given_Game_When_JoinGame_Then_ShouldCallGameAcceptPlayer() throws XAndOGameError {
        sut.joinGame(game);
        verify(game).acceptPlayer(sut);
    }

    @Test
    void test_Given_MoveProperties_When_MakeMove_Then_ShouldCallGameAcceptMove() throws XAndOGameError {
        int index = 0;
        PlayerTag playerTag = PlayerTag.PLAYER_O;

        sut.makeMove(game, playerTag, index);

        verify(game).acceptMove(Move.builder()
                .player(sut)
                .cellIndex(index)
                .playerTag(playerTag)
                .build());
    }


}