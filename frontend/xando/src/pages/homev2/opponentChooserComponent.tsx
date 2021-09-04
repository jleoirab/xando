import React, { ChangeEvent } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { OpponentType } from "../../application/types";

interface OpponentChooserComponentProps {
  onOpponentSelected(opponentType: OpponentType): void;
}


const OpponentChooserComponent: React.FC<OpponentChooserComponentProps> = (props: OpponentChooserComponentProps) => {
  return (
    <section className="home-section new-game-creator-section">
      <h1>Choose Opponent</h1>
      <Row className="action-buttons">
        <Button
          className="btn-green"
          variant="custom"
          onClick={() => props.onOpponentSelected(OpponentType.NOT_AI)}
        >
          Other Player
        </Button>

        <Button
          className="btn-blue"
          variant="custom"
          onClick={() => props.onOpponentSelected(OpponentType.AI)}
        >
          AI
        </Button>
      </Row>
    </section>
  );
}

export default OpponentChooserComponent;