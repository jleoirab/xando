package com.jleoirab.xando.domain.model;

/** Created by jleoirab on 2021-02-09 */
public enum PlayerTag {
    PLAYER_X('X'),
    PLAYER_O('O');

    private final char value;

    PlayerTag(char value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return Character.toString(value);
    }

    public PlayerTag opponent() {
        return value == 'X' ? PLAYER_O : PLAYER_X;
    }

    public static PlayerTag from(String value) {
        if (value.equals("X")) return PLAYER_X;
        else if (value.equals("O")) return PLAYER_O;
        else throw new IllegalArgumentException(String.format("Invalid play tag (%s)", value));
    }

    public static PlayerTag from(char value) {
        if (value == 'X') return PLAYER_X;
        else if (value == 'O') return PLAYER_O;
        else throw new IllegalArgumentException(String.format("Invalid play tag (%s)", value));
    }

    public char getChar() {
        return value;
    }
}