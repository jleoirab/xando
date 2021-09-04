import React from "react";
import Button from 'react-bootstrap/Button';

interface Props {
  onClick(): void;
}

const GameOptionsSection: React.FC<Props> = (props: Props) => {
  return (
    <section className="gameOptionsSection">
      <Button variant="outline-secondary" onClick={props.onClick}>Leave Game</Button>
    </section>
  );
}

export default GameOptionsSection;