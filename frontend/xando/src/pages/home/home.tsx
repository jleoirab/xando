import React from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import MainGameLobbySection from './mainGameLobbySection';
import PlayerTagSettingSection from './playerTagSettingSection';

import './home.css'

interface Props {}

interface State {
  desiredPlayerName: string;
  desiredPlayerTag: string;
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

export default class GameLobbyPage extends React.Component<Props, State> {
  state: State = {
    desiredPlayerName: "",
    desiredPlayerTag: "Random",
  };

  constructor(props: Props) {
    super(props);

    this.createGame = this.createGame.bind(this);
    this.joinAGame = this.joinAGame.bind(this);
    this.desiredPlayerTagSelected = this.desiredPlayerTagSelected.bind(this);
    this.playerNameChanged = this.playerNameChanged.bind(this);
  }

  createGame() {
    console.debug("creaate game clicked");
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
    console.debug("player name changed", newName)
    this.setState({
      desiredPlayerName: newName,
    });
  }

  render() {
    return (
      <Container fluid>
        <MainGameLobbySection
          playerName={this.state.desiredPlayerName}
          onCreateGameClicked={this.createGame}
          onJoinGameClicked={this.joinAGame}
          playerNameChanged={this.playerNameChanged}
        />
        <PlayerTagSettingSection
          playerTagOptions={playerTagOptions}
          desiredPlayerTag={this.state.desiredPlayerTag}
          desiredPlayerTagChanged={this.desiredPlayerTagSelected}
        />
      </Container>
    );
  }
}