import React, { ChangeEvent } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

interface MainGameLobbySectionProps {
  playerName: string;
  onCreateGameClicked(): void;
  onJoinGameClicked(): void;
  playerNameChanged(newName: string): void;
  display: boolean;
}

const MainGameLobbySection: React.FC<MainGameLobbySectionProps> = (props: MainGameLobbySectionProps) => {
  return (
    <section className={`gameLobbySection ${props.display ? '' : 'd-none'}`}>
      <h1>XandO</h1>
      <Form className="mainLobbySectionForm">
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
              onClick={props.onCreateGameClicked}
            >
              Create a Game
          </Button>
          </Col>

          <Col>
            <Button
              variant="info"
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