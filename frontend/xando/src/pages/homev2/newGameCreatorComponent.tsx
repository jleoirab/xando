import React, { ChangeEvent } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { PlayerTagSelection } from "../../application/types";

interface NewGameCreatorComponentProps {
  onPlayerTagSelected(tag: PlayerTagSelection): void;
}


const NewGameCreatorComponent: React.FC<NewGameCreatorComponentProps> = (props: NewGameCreatorComponentProps) => {
  return (
    <section className="home-section new-game-creator-section">
      <h1>New Game</h1>
      <h5>Choose Symbol</h5>
      <Row className="action-buttons">
        <Button
          className="btn-green"
          variant="custom"
          onClick={() => props.onPlayerTagSelected(PlayerTagSelection.X)}
        >
          X
        </Button>

        <Button
          className="btn-blue"
          variant="custom"
          onClick={() => props.onPlayerTagSelected(PlayerTagSelection.O)}
        >
          O
        </Button>

        <Button
          className="btn-gold"
          variant="custom"
          onClick={() => props.onPlayerTagSelected(PlayerTagSelection.RANDOM)}
        >
          Random
        </Button>
      </Row>
    </section>
  );
}

export default NewGameCreatorComponent;