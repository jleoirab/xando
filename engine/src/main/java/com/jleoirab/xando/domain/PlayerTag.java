package com.jleoirab.xando.domain;

/**
 * Created by jleoirab on 2021-02-09
 */
public enum PlayerTag {
    PLAYER_X("X"),
    PLAYER_O("O");

    private final String value;

    PlayerTag(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return value;
    }

    public PlayerTag opponent() {
        return value.equals("X") ? PLAYER_O : PLAYER_X;
    }

    public static PlayerTag from(String value) {
        if (value.equals("X")) return PLAYER_X;
        else if (value.equals("O")) return PLAYER_O;
        else throw new IllegalArgumentException(String.format("Invalid play tag (%s)", value));
    }
}
