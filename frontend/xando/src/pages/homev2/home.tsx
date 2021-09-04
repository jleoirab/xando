import React from "react";
import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RouteComponentProps } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import { GameCreationConfig, JoinGameConfig, PlayerTagSelection, PlayerTagOption, OpponentType } from '../../application/types';
import { RootState } from "../../store/store";
import { Action } from "redux";
import { callCreateGame, registerJoinGameIntent } from "../../store/game/actions";
import { AlertV1 } from "../../components/alertv1/alert";

import './home.css'
import { ComponentSwitcher, SwitcheableComponent } from "../../components/componentSwitcher";
import StartingPointComponent from "./startingPointComponent";
import NewGameCreatorComponent from "./newGameCreatorComponent";
import OpponentChooserComponent from "./opponentChooserComponent";
import WaitingComponent from './waitingComponent';
import JoinGameComponent from './joinGameComponent';

interface State {
  desiredPlayerName: string;
  desiredPlayerTag: PlayerTagSelection;
  homePageState: HomePageState;
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
type HomePageProps = ConnectedProps<typeof connector> & RouteComponentProps;

enum HomePageState {
  STARTING,
  CREATING_GAME,
  JOINING,
  OPPONENT_CHOOSER,
  WAITING_FOR_START,
}

class HomePage extends React.Component<HomePageProps, State> {
  state: State = {
    desiredPlayerName: "",
    desiredPlayerTag: PlayerTagSelection.RANDOM,
    homePageState: HomePageState.STARTING,
    errorMessage: "",
    desiredGameId: "",
  };

  constructor(props: HomePageProps) {
    super(props);

    this.createGame = this.createGame.bind(this);
    this.joinGameIntended = this.joinGameIntended.bind(this);
    this.joinGame = this.joinGame.bind(this);
    this.desiredPlayerTagSelected = this.desiredPlayerTagSelected.bind(this);
    this.playerNameChanged = this.playerNameChanged.bind(this);
    this.onGameIdChanged = this.onGameIdChanged.bind(this);
    this.onOpponentSelected = this.onOpponentSelected.bind(this);
    this.clearErrorMessage = this.clearErrorMessage.bind(this);
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

    this.showState(HomePageState.CREATING_GAME);
  }

  joinGameIntended() {
    console.debug("join a game clicked");
    if (!this.validatePlayerName()) {
      this.showErrorState("Please enter a username.");
      return;
    }

    this.showState(HomePageState.JOINING);
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
      homePageState: HomePageState.OPPONENT_CHOOSER,
    });
  }

  playerNameChanged(newName: string) {
    console.debug("player name changed", newName);
    this.setState({
      desiredPlayerName: newName,
    });
  }

  onOpponentSelected(opponentType: OpponentType) {
    this.showState(HomePageState.WAITING_FOR_START);

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
      homePageState: HomePageState.STARTING,
    });
  }

  showState(state: HomePageState) {
    this.setState(Object.assign({}, this.state, {
      homePageState: state,
    }));
  }

  clearErrorMessage() {
    const newState = Object.assign({}, this.state, { errorMessage: "", });
    console.log("updating state", newState);
    this.setState(newState);
  }

  onGameIdChanged(newGameId: string) {
    this.setState({
      desiredGameId: newGameId,
    });
  }

  render() {
    console.log("home", this.state);
    return (
      <div>
        <AlertV1
          onClose={this.clearErrorMessage}
          show={this.state.errorMessage !== ""}
          message={this.state.errorMessage}
          title="Error"
        />
        <Container fluid className="page">
          <ComponentSwitcher currentState={this.state.homePageState}>
            <SwitcheableComponent id={HomePageState.STARTING} classNames="item">
              <StartingPointComponent
                onNewGame={this.createGame}
                onJoinGame={this.joinGameIntended}
                playerName={this.state.desiredPlayerName}
                onPlayerNameUpdate={this.playerNameChanged}
              />
            </SwitcheableComponent>
            <SwitcheableComponent id={HomePageState.CREATING_GAME} classNames="item">
              <NewGameCreatorComponent
                onPlayerTagSelected={this.desiredPlayerTagSelected}
              />
            </SwitcheableComponent>
            <SwitcheableComponent id={HomePageState.OPPONENT_CHOOSER} classNames="item">
              <OpponentChooserComponent
                onOpponentSelected={this.onOpponentSelected}
              />
            </SwitcheableComponent>
            <SwitcheableComponent id={HomePageState.WAITING_FOR_START} classNames="item">
              <WaitingComponent />
            </SwitcheableComponent>
            <SwitcheableComponent id={HomePageState.JOINING} classNames="item">
              <JoinGameComponent
                onJoinGame={this.joinGame}
              />
            </SwitcheableComponent>
          </ComponentSwitcher>
        </Container>
      </div>
    );
  }
}

export default connector(HomePage)