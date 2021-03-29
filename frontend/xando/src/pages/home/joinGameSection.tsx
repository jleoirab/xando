import React, { ChangeEvent } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

interface JoinGameSectionProps {
  onJoinGame(): void;
  onGameIdChanged(newGameId: string): void;
  gameId: string;
  display: boolean;
}


const JoinGameSection: React.FC<JoinGameSectionProps> = (props: JoinGameSectionProps) => {
  return (
    <section className={`joingGmaeSection ${props.display ? '' : 'd-none'}`}>
      <Form className="joinGameSectionForm">
        <Form.Group controlId="gameId">
          <Form.Control
            as="input"
            type=""
            required
            placeholder="enter game id"
            value={props.gameId}
            onChange={(event: ChangeEvent<HTMLInputElement>) => props.onGameIdChanged(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Row>
          <Col>
            <Button
              variant="primary"
              onClick={props.onJoinGame}
            >
              Join
          </Button>
          </Col>
        </Form.Row>
      </Form>
    </section>
  );
}

export default JoinGameSection;