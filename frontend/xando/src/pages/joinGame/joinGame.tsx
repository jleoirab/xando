import React, { ChangeEvent } from "react";
import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RouteComponentProps } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { AlertV1 } from "../../components/alertv1/alert";

import { JoinGameConfig } from '../../application/types';
import { RootState } from "../../store/store";
import { Action } from "redux";
import { registerJoinGameIntent } from "../../store/game/actions";

import './joinGame.css'

interface State {
  desiredPlayerName: string;
  desiredGameId?: string;
  errorMessage: string;
}

interface RouterParams {
  gameId: string;
}

const mapStateToProps = (state: RootState) => ({
  player: state.system.systemPlayer,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => ({
  onJoinGame: (config: JoinGameConfig) => dispatch(registerJoinGameIntent(config)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type JoinGamePageProps = ConnectedProps<typeof connector> & RouteComponentProps<RouterParams, any, any>;


class JoinGamePage extends React.Component<JoinGamePageProps, State> {
  state: State = {
    desiredPlayerName: "",
    errorMessage: "",
    desiredGameId: "",
  };

  constructor(props: JoinGamePageProps) {
    super(props);

    this.joinGame = this.joinGame.bind(this);
    this.playerNameChanged = this.playerNameChanged.bind(this);
    this.clearErrorMessage = this.clearErrorMessage.bind(this);
  }

  componentDidMount() {
    if (this.props.player) {
      this.setState({
        desiredPlayerName: this.props.player.playerName,
        desiredGameId: this.props.match.params.gameId,
      });
    }
  }

  playerNameChanged(newName: string) {
    console.debug("player name changed", newName);
    this.setState({
      desiredPlayerName: newName,
    });
  }

  joinGame() {
    if (!this.validateGameId()) {
      this.showErrorState("Please enter a game id");
      return;
    }

    console.log("joining game");

    this.props.onJoinGame({
      playerName: this.state.desiredPlayerName,
      gameId: this.state.desiredGameId,
    });
  }

  validatePlayerName(): boolean {
    console.log(this.state.desiredPlayerName, !!!this.state.desiredPlayerName, this.state.desiredPlayerName.length === 0);
    if (!this.state.desiredPlayerName || this.state.desiredPlayerName.length === 0) {
      return false;
    }

    return true;
  }

  validateGameId(): boolean {
    const gameId = this.state.desiredPlayerName;

    console.log(gameId, !!!gameId, gameId.length === 0);
    if (!gameId || gameId.length === 0) {
      return false;
    }

    return true;
  }

  showErrorState(errorMessage: string) {
    this.setState(Object.assign({}, this.state, {
      errorMessage: errorMessage,
    }));
  }

  clearErrorMessage() {
    this.setState(Object.assign({}, this.state, {
      errorMessage: "",
    }));
  }

  render() {
    return (<div>
      <AlertV1
        onClose={this.clearErrorMessage}
        show={this.state.errorMessage !== ""}
        message={this.state.errorMessage}
        title="Error"
      />
      <Container fluid className="page">
        <h5>Game ID: <span className="game-id">{this.state.desiredGameId}</span></h5>
        <h1>Enter Player Name to Join</h1>
        <Form className="joing-game-form">
          <Form.Row>
            <Form.Control
              className="form-inputs"
              as="input"
              type=""
              required
              placeholder="Player Name"
              value={this.state.desiredPlayerName}
              onChange={(event: ChangeEvent<HTMLInputElement>) => this.playerNameChanged(event.target.value)}
            />
          </Form.Row>
          <Form.Row className="action-buttons">
            <Button
              className="btn-gold"
              variant="custom"
              onClick={this.joinGame}
            >
              Join
            </Button>
          </Form.Row>
        </Form>
      </Container>
    </div>);
  }
}

export default connector(JoinGamePage)