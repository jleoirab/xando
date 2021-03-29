import React from "react";
import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RouteComponentProps } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import { Game, IN_PROGRESS_STATE, Move, Player, X_TAG, GameStatusState, CREATED_STATE } from '../../application/types';

import './game.css';

import { RootState } from "../../store/store";
import { callMakeMove, loadGame, subscibeToGameEvents, unsubscribeToGameEvents } from "../../store/game/actions";
import { Action } from "redux";
import ScoreBoardSection from "./scoreBoardSection";
import TieHistorySection from "./tieHistorySection";
import GameOptionsSection from "./gameOptionsSection";
import GameBoardSection from "./gameBoardSection";
import WaitingLobbySection from "./waitingLobbySection";

interface State {
}

const mapStateToProps = (state: RootState) => ({
  currentGame: state.game.currentGame,
  playerInSession: state.system.systemPlayer,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => ({
  onMakeMove: (move: Move) => dispatch(callMakeMove(move)),
  loadGame: (gameId: string) => dispatch(loadGame(gameId)),
  subscribeToGameEvents: (gameId: string) => dispatch(subscibeToGameEvents(gameId)),
  unsubscribeToGameEvents: () => dispatch(unsubscribeToGameEvents()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type GamePageProps = ConnectedProps<typeof connector> & RouteComponentProps;

const defaultGameBoard = [null, null, null, null, null, null, null, null, null,];
class GamePage extends React.Component<GamePageProps, State> {
  state: State = {};

  constructor(props: GamePageProps) {
    super(props);

    this.onMakeMove = this.onMakeMove.bind(this);
  }

  onMakeMove(cellIndex: number) {
    console.log("make move", cellIndex);
    const playerTag = this.props.currentGame.currentPlayerTurn;
    const player = playerTag == X_TAG ? this.props.currentGame.playerX : this.props.currentGame.playerO;

    this.props.onMakeMove({
      gameId: this.props.currentGame.id,
      player,
      playerTag,
      cellIndex,
    });
  }

  componentDidMount() {
    const gameId = this.props.match.params["gameId"];
    console.log(this.props);
    console.log(this.props.currentGame);

    if (!this.props.currentGame) {
      this.props.loadGame(gameId);
    }

    this.props.subscribeToGameEvents(gameId);
  }

  componentWillUnmount() {
    this.props.unsubscribeToGameEvents();
  }

  private canPlay() {
    const game = this.props.currentGame;

    if (!game || game.gameStatus.state !== IN_PROGRESS_STATE) return false;

    const currentPlayer = this.props.playerInSession;
    const playerTag = game.currentPlayerTurn;
    const playerToPlay = playerTag == X_TAG ? game.playerX : game.playerO;

    return currentPlayer.id === playerToPlay.id;
  }

  private renderGame() {
    return (
      <Container fluid className="page gamePageSections">
        {/* TODO: Implement these.
          <div className="sidebar">
          <ScoreBoardSection />
          <TieHistorySection />
          <GameOptionsSection />
        </div> */}
        <GameBoardSection
          game={this.props.currentGame}
          onMakeMove={this.onMakeMove}
          canPlay={this.canPlay()}
        />
      </Container>
    );
  }

  private renderWaitingRoom() {
    return (
      <WaitingLobbySection />
    );
  }

  private renderSection() {
    const gameState = this.props.currentGame?.gameStatus.state;

    switch(gameState) {
      case CREATED_STATE:
        return this.renderWaitingRoom();
      case IN_PROGRESS_STATE:
        return this.renderGame();
      default:
        return (null);
    }
  }

  render() {
    return (
      <Container fluid className="page gamePage">
        <h1>XandO</h1>
        {this.renderSection()}
      </Container>
    );
  }
}

export default connector(GamePage)