import React from "react";
import { Game, PlayerTag, X_TAG } from "../../application/types";

const playerTagHTML = (tag: PlayerTag) => {
  return tag == X_TAG ? "X" : "O";
}


interface CellProps {
  tag: PlayerTag | null;
  index: number;
  canPlay: boolean;
  onClick(index: number): void;
}

const Cell: React.FC<CellProps> = (props: CellProps) => {
  const occupied = props.tag != null;
  const tag = occupied ? playerTagHTML(props.tag) : "";
  const cellDisabled = occupied || !props.canPlay;
  const className = `cell ${cellDisabled ? 'disabled' : 'free'}`;
  const onClick = () => {
    if (cellDisabled) return;
    props.onClick(props.index);
  }
  return (<td className={className} onClick={onClick}>{tag}</td>);
}

interface Props {
  game?: Game;
  canPlay: boolean;
  onMakeMove(index: number): void;
}

const GameBoardSection: React.FC<Props> = (props: Props) => {
  const cells = props.game.gameBoard.map((tag, i) => {
    return (<Cell
      key={i}
      onClick={props.onMakeMove}
      canPlay={props.canPlay}
      tag={tag}
      index={i}
    />)
  });
  const rows = [];
  const numRows = cells.length / 3
  for (let i = 0; i < numRows; ++i) {
    const cellsInRow = cells.slice(i * numRows, (i + 1) * numRows);
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