import React, { ChangeEvent, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

interface JoinGameComponentProps {
  onJoinGame(gameId: string): void;
}


const JoinGameComponent: React.FC<JoinGameComponentProps> = (props: JoinGameComponentProps) => {
  const [gameId, setGameId] = useState("");

  return (
    <section className="home-section starting-point-section">
      <h1>Join Game</h1>
      <h5>Enter Game ID</h5>
      <Form className="starting-point-form">
        <Form.Row>
          <Form.Control
            className="form-inputs"
            as="input"
            type=""
            required
            placeholder="Game ID"
            value={gameId}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setGameId(event.target.value)}
          />
        </Form.Row>
        <Form.Row className="action-buttons">
          <Button
            className="btn-gold"
            variant="custom"
            onClick={() => props.onJoinGame(gameId)}
          >
            Join
          </Button>
        </Form.Row>
      </Form>
    </section>
  );
}

export default JoinGameComponent;