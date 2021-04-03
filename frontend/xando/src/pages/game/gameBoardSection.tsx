import React, { useEffect } from "react";
import { Game, PlayerTag, X_TAG } from "../../application/types";

const playerTagHTML = (tag: PlayerTag) => {
  return tag == X_TAG ? "X" : "O";
}

const GAME_BOARD_GRID_SIZE = 3;
const GAME_BOARD_SIZE = GAME_BOARD_GRID_SIZE * GAME_BOARD_GRID_SIZE;
const EMPTY_BOARD = new Array(GAME_BOARD_SIZE).fill(null);

interface CellProps {
  tag: PlayerTag | null;
  index: number;
  canPlay: boolean;
  inWinLine: boolean;
  onClick(index: number): void;
}

const Cell: React.FC<CellProps> = (props: CellProps) => {
  const occupied = props.tag != null;
  const tag = occupied ? playerTagHTML(props.tag) : "";
  const cellDisabled = occupied || !props.canPlay;
  const className = `cell ${props.inWinLine ? 'cell-in-win-line' : ''} ${cellDisabled ? 'disabled' : 'free'}`;
  const onClick = () => {
    if (cellDisabled) return;
    props.onClick(props.index);
  }
  return (<td id={`cell-${props.index}`} className={className} onClick={onClick}>{tag}</td>);
}

interface Props {
  game?: Game;
  canPlay: boolean;
  onMakeMove(index: number): void;
}

const GameBoardSection: React.FC<Props> = (props: Props) => {
  const gameBoard = props.game ? props.game.gameBoard : EMPTY_BOARD
  const winLine = props.game?.gameStatus.winLine ? props.game.gameStatus.winLine : [];

  const cells = gameBoard.map((tag, i) => {
    return (<Cell
      key={i}
      onClick={props.onMakeMove}
      canPlay={props.canPlay}
      tag={tag}
      index={i}
      inWinLine={winLine.includes(i)}
    />)
  });

  const rows = [];

  for (let i = 0; i < GAME_BOARD_GRID_SIZE; ++i) {
    const cellsInRow = cells.slice(i * GAME_BOARD_GRID_SIZE, (i + 1) * GAME_BOARD_GRID_SIZE);
    const row = (<tr key={i}>{cellsInRow}</tr>);
    rows.push(row);
  }

  return (
    <div className="gameBoard">
        <table className="gameBoardTable">
          <tbody>
          {rows}
          </tbody>
        </table>
    </div>
  );
}

export default GameBoardSection;