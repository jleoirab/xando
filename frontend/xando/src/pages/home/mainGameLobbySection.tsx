import React, { ChangeEvent } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

interface MainGameLobbySectionProps {
  playerName: string;
  onCreateGameClicked(): void;
  onJoinGameClicked(): void;
  playerNameChanged(newName: string): void;
}

const MainGameLobbySection: React.FC<MainGameLobbySectionProps> = (props: MainGameLobbySectionProps) => {
  return (
    <section className="mainGameLobbySection">
      <h1>XandO</h1>
      <Form>
        <Form.Group controlId="playerName">
          <Form.Control
            as="input"
            type=""
            placeholder="enter your username"
            value={props.playerName}
            onChange={(event: ChangeEvent<HTMLInputElement>) => props.playerNameChanged(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Row>
          <Col>
            <Button
              variant="primary"
              type="submit"
              onClick={props.onCreateGameClicked}
            >
              Create a Game
          </Button>
          </Col>

          <Col>
            <Button
              variant="info"
              type="submit"
              onClick={props.onJoinGameClicked}
            >
              Join a Game
          </Button>
          </Col>
        </Form.Row>
      </Form>
    </section>
  );
}

export default MainGameLobbySection;