import React from "react";
import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RouteComponentProps } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import MainGameLobbySection from './mainGameLobbySection';
import PlayerTagSettingSection from './playerTagSettingSection';
import StatusToast from './statusToast';
import { GameCreationConfig, JoinGameConfig, PlayerTagSelection, PlayerTagOption } from '../../application/types';

import './home.css'
import { RootState } from "../../store/store";
import { callCreateGame, registerJoinGameIntent } from "../../store/game/actions";
import { Action } from "redux";
import JoinGameSection from "./joinGameSection";

interface State {
  desiredPlayerName: string;
  desiredPlayerTag: PlayerTagSelection;
  gameLobbyState: GameLobbyState;
  errorMessage: string;
  desiredGameId: string;
}

const mapStateToProps = (state: RootState) => ({
  playerTagOptions: state.game.playerTagOptions,
  player: state.system.systemPlayer,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => ({
  onCreateGame: (config: GameCreationConfig) => dispatch(callCreateGame(config)),
  onJoinGame: (config: JoinGameConfig) => dispatch(registerJoinGameIntent(config)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type GameLobbyPageProps = ConnectedProps<typeof connector> & RouteComponentProps;

enum GameLobbyState {
  STARTING,
  PLAYER_TAG_SELECTION,
  JOINING,
  COMPLETE,
}

class GameLobbyPage extends React.Component<GameLobbyPageProps, State> {
  state: State = {
    desiredPlayerName: "",
    desiredPlayerTag: PlayerTagSelection.RANDOM,
    gameLobbyState: GameLobbyState.STARTING,
    errorMessage: "",
    desiredGameId: "",
  };

  constructor(props: GameLobbyPageProps) {
    super(props);

    this.createGame = this.createGame.bind(this);
    this.joinGameIntended = this.joinGameIntended.bind(this);
    this.joinGame = this.joinGame.bind(this);
    this.desiredPlayerTagSelected = this.desiredPlayerTagSelected.bind(this);
    this.playerNameChanged = this.playerNameChanged.bind(this);
    this.onPlayerTagSelectionComplete = this.onPlayerTagSelectionComplete.bind(this);
    this.onGameIdChanged = this.onGameIdChanged.bind(this);
  }

  componentDidMount() {
    if (this.props.player) {
      this.setState({
        desiredPlayerName: this.props.player.playerName,
      });
    }
  }

  createGame() {
    console.debug("creaate game clicked");

    if (!this.validatePlayerName()) {
      this.showErrorState("Please enter a username.");
      return;
    }

    this.showState(GameLobbyState.PLAYER_TAG_SELECTION);
  }

  joinGameIntended() {
    console.debug("join a game clicked");
    if (!this.validatePlayerName()) {
      this.showErrorState("Please enter a username.");
      return;
    }

    this.showState(GameLobbyState.JOINING);
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

  desiredPlayerTagSelected(tag: PlayerTagSelection) {
    console.debug("desired player tag selected", tag);
    this.setState({
      desiredPlayerTag: tag,
    });
  }

  playerNameChanged(newName: string) {
    console.debug("player name changed", newName);
    this.setState({
      desiredPlayerName: newName,
    });
  }

  onPlayerTagSelectionComplete() {
    console.debug("player selection complete");
    this.showState(GameLobbyState.COMPLETE);

    this.props.onCreateGame({
      playerName: this.state.desiredPlayerName,
      desiredPlayerTag: this.state.desiredPlayerTag,
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
    console.log(this.state.desiredGameId, !!!this.state.desiredGameId, this.state.desiredGameId.length === 0);
    if (!this.state.desiredGameId || this.state.desiredGameId.length === 0) {
      return false;
    }

    return true;
  }

  showErrorState(errorMessage: string) {
    this.setState({
      errorMessage: errorMessage,
      gameLobbyState: GameLobbyState.STARTING,
    });
  }

  showState(state: GameLobbyState) {
    this.setState({
      gameLobbyState: state,
      errorMessage: "",
    });
  }

  onGameIdChanged(newGameId: string) {
    this.setState({
      desiredGameId: newGameId,
    });
  }

  render() {
    return (
      <Container fluid className="page gameLobbyPage">
        <h1>XandO</h1>
        <StatusToast
          message={this.state.errorMessage}
          display={!!this.state.errorMessage || !!this.state.errorMessage?.trim().length}
        />
        <MainGameLobbySection
          display={this.state.gameLobbyState === GameLobbyState.STARTING}
          playerName={this.state.desiredPlayerName}
          onCreateGameClicked={this.createGame}
          onJoinGameClicked={this.joinGameIntended}
          playerNameChanged={this.playerNameChanged}
        />
        <PlayerTagSettingSection
          display={this.state.gameLobbyState === GameLobbyState.PLAYER_TAG_SELECTION}
          playerTagOptions={this.props.playerTagOptions}
          desiredPlayerTag={this.state.desiredPlayerTag}
          desiredPlayerTagChanged={this.desiredPlayerTagSelected}
          onComplete={this.onPlayerTagSelectionComplete}
        />
        <JoinGameSection
          display={this.state.gameLobbyState === GameLobbyState.JOINING}
          gameId={this.state.desiredGameId}
          onGameIdChanged={this.onGameIdChanged}
          onJoinGame={this.joinGame}
        />
      </Container>
    );
  }
}

export default connector(GameLobbyPage)