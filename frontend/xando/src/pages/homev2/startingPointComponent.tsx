import React, { ChangeEvent } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

interface StartingPointComponentProps {
  onNewGame(): void;
  onJoinGame(): void;
  playerName: string;
  onPlayerNameUpdate(val: string): void;
}


const StartingPointComponent: React.FC<StartingPointComponentProps> = (props: StartingPointComponentProps) => {
  return (
    <section className="home-section starting-point-section">
      <Form className="starting-point-form">
        <Form.Row>
          <Form.Control
            className="form-inputs"
            as="input"
            type=""
            required
            placeholder="Player Name"
            value={props.playerName}
            onChange={(event: ChangeEvent<HTMLInputElement>) => props.onPlayerNameUpdate(event.target.value)}
          />
        </Form.Row>
        <Form.Row className="action-buttons">
          <Button
            className="btn-green"
            variant="custom"
            onClick={props.onNewGame}
          >
            Create Game
            </Button>

          <Button
            className="btn-blue"
            variant="custom"
            onClick={props.onJoinGame}
          >
            Join Game
            </Button>
        </Form.Row>
      </Form>
    </section>
  );
}

export default StartingPointComponent;