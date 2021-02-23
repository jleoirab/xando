import React from "react";
import Container from 'react-bootstrap/Container';
import MainGameLobbySection from './mainGameLobbySection';
import PlayerTagSettingSection from './playerTagSettingSection';

import './home.css'

interface Props {}

interface State {
  desiredPlayerName: string;
  desiredPlayerTag: string;
  gameLobbyState: GameLobbyState;
}

const playerTagOptions = [
  {
    label: "Random",
    value: "Random",
  },
  {
    label: "X",
    value: "X",
  },
  {
    label: "O",
    value: "O",
  },
];

enum GameLobbyState {
  STARTING,
  PLAYER_TAG_SELECTION,
  JOINING,
  COMPLETE,
}

export default class GameLobbyPage extends React.Component<Props, State> {
  state: State = {
    desiredPlayerName: "",
    desiredPlayerTag: "Random",
    gameLobbyState: GameLobbyState.STARTING,
  };

  constructor(props: Props) {
    super(props);

    this.createGame = this.createGame.bind(this);
    this.joinAGame = this.joinAGame.bind(this);
    this.desiredPlayerTagSelected = this.desiredPlayerTagSelected.bind(this);
    this.playerNameChanged = this.playerNameChanged.bind(this);
    this.onPlayerTagSelectionComplete = this.onPlayerTagSelectionComplete.bind(this);
  }

  createGame() {
    console.debug("creaate game clicked");
    this.setState({
      gameLobbyState: GameLobbyState.PLAYER_TAG_SELECTION,
    });
  }

  joinAGame() {
    console.debug("join a game clicked");
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
    this.setState({
      gameLobbyState: GameLobbyState.COMPLETE,
    });
  }

  render() {
    console.log("re-rendering game lobby");
    console.log(this.state);
    return (
      <Container fluid className="gameLobbySections">
        <MainGameLobbySection
          display={this.state.gameLobbyState === GameLobbyState.STARTING}
          playerName={this.state.desiredPlayerName}
          onCreateGameClicked={this.createGame}
          onJoinGameClicked={this.joinAGame}
          playerNameChanged={this.playerNameChanged}
        />
        <PlayerTagSettingSection
          display={this.state.gameLobbyState === GameLobbyState.PLAYER_TAG_SELECTION}
          playerTagOptions={playerTagOptions}
          desiredPlayerTag={this.state.desiredPlayerTag}
          desiredPlayerTagChanged={this.desiredPlayerTagSelected}
          onComplete={this.onPlayerTagSelectionComplete}
        />
      </Container>
    );
  }
}