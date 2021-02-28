import React from "react";
import Container from 'react-bootstrap/Container';
import MainGameLobbySection from './mainGameLobbySection';
import PlayerTagSettingSection from './playerTagSettingSection';
import StatusToast from './statusToast';

import './home.css'

interface State {
  desiredPlayerName: string;
  desiredPlayerTag: string;
  gameLobbyState: GameLobbyState;
  errorMessage: string,
}

// TODO: Move this to where it should be
export interface GameConfigOptions {
  playerName: string;
}

export interface GameCreationConfig extends GameConfigOptions {
  desiredPlayerTag: string;
}

export interface JoinGameConfig extends GameConfigOptions {
  // gameId: string;
}

export interface GameLobbyPageProps {
  playerTagOptions: Array<{label: string, value: string}>;
  playerName?: string;
  onCreateGame(config: GameCreationConfig): void;
  onJoinGame(config: JoinGameConfig): void;
}

enum GameLobbyState {
  STARTING,
  PLAYER_TAG_SELECTION,
  JOINING,
  COMPLETE,
}

export default class GameLobbyPage extends React.Component<GameLobbyPageProps, State> {
  state: State = {
    desiredPlayerName: "",
    desiredPlayerTag: "Random",
    gameLobbyState: GameLobbyState.STARTING,
    errorMessage: "",
  };

  constructor(props: GameLobbyPageProps) {
    super(props);

    this.createGame = this.createGame.bind(this);
    this.joinAGame = this.joinAGame.bind(this);
    this.desiredPlayerTagSelected = this.desiredPlayerTagSelected.bind(this);
    this.playerNameChanged = this.playerNameChanged.bind(this);
    this.onPlayerTagSelectionComplete = this.onPlayerTagSelectionComplete.bind(this);
  }

  createGame() {
    console.debug("creaate game clicked");

    if (!this.validatePlayerName()) {
      this.showErrorState("Please enter a username.");
      return;
    }

    this.showState(GameLobbyState.PLAYER_TAG_SELECTION);
  }

  joinAGame() {
    console.debug("join a game clicked");
    if (!this.validatePlayerName()) {
      this.showErrorState("Please enter a username.");
      return;
    }

    this.showState(GameLobbyState.COMPLETE);

    this.props.onJoinGame({
      playerName: this.state.desiredPlayerName,
    });
  }

  desiredPlayerTagSelected(tag: string) {
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
    if (!!!this.state.desiredPlayerName || this.state.desiredPlayerName.length === 0) {
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

  shouldComponentUpdate(nextProps: Readonly<GameLobbyPageProps>, nextState: Readonly<State>, nextContext: any): boolean {
    return true;
  }

  render() {
    return (
      <Container fluid className="gameLobbySections">
        <h1>XandO</h1>
        <StatusToast
          message={this.state.errorMessage}
        />
        <MainGameLobbySection
          display={this.state.gameLobbyState === GameLobbyState.STARTING}
          playerName={this.state.desiredPlayerName}
          onCreateGameClicked={this.createGame}
          onJoinGameClicked={this.joinAGame}
          playerNameChanged={this.playerNameChanged}
        />
        <PlayerTagSettingSection
          display={this.state.gameLobbyState === GameLobbyState.PLAYER_TAG_SELECTION}
          playerTagOptions={this.props.playerTagOptions}
          desiredPlayerTag={this.state.desiredPlayerTag}
          desiredPlayerTagChanged={this.desiredPlayerTagSelected}
          onComplete={this.onPlayerTagSelectionComplete}
        />
      </Container>
    );
  }
}