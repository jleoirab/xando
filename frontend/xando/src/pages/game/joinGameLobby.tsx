import React, { ChangeEvent, useEffect, useState } from "react";
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from "react-router-dom";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { useParams } from "react-router-dom";

import { createPlayer, joinGame } from "../../store/game/actions";
import { RootState } from "../../store/store";


const mapStateToProps = (state: RootState) => ({
  currentPlayer: state.system.systemPlayer,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => ({
  createPlayer: (playerName: string) => dispatch(createPlayer(playerName)),
  joinGame: (gameId: string) => dispatch(joinGame(gameId))
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector> & RouteComponentProps;


interface JoinMessageProps {
  gameId: string;
}

const JoinMessage: React.FC<JoinMessageProps> = (props: JoinMessageProps) => {
  return (
    <section className={`gameBoard`}>
      <p>{`Joining game (id: ${props.gameId})...`}</p>
    </section>
  );
}

interface CreateUserProps {
  createUser(playerName: string): void;
}

const CreateUser: React.FC<CreateUserProps> = (props: CreateUserProps) => {
  const [playerName, setPlayerName] = useState("");
  const joinGame = () => {
    props.createUser(playerName);
  }

  return (
    <section className={`joinGameLobbyFormSection`}>
      <Form className="joinGameLobbyForm">
        <Form.Group controlId="playerName">
          <Form.Control
            as="input"
            type=""
            required
            placeholder="enter your username"
            value={playerName}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setPlayerName(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Row>
          <Col>
            <Button
              variant="primary"
              onClick={joinGame}
            >
              Join Game
        </Button>
          </Col>
        </Form.Row>
      </Form>
    </section>
  );
}

const JoinGameLobby: React.FC<Props> = (props: Props) => {
  const { gameId } = useParams<{gameId: string}>();
  const hasCurrentPlayer = !!props.currentPlayer;

  useEffect(() => {
    if (hasCurrentPlayer) {
      props.joinGame(gameId);
    }
  });

  const view = hasCurrentPlayer ?
  (
    <JoinMessage
      gameId={gameId}
    />
  ) :
  (
    <CreateUser
      createUser={props.createPlayer}
    />
  );

  return (
    <Container fluid className="page gamePage">
      <h1>XandO</h1>
      {view}
    </Container>
  );
}

export default connector(JoinGameLobby);