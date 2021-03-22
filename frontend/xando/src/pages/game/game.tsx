import React from "react";
import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import Container from 'react-bootstrap/Container';
import { Game, Move, Player, X_TAG } from '../../application/types';

import './game.css';

import { RootState } from "../../store/store";
import { callMakeMove } from "../../store/game/actions";
import { Action } from "redux";
import ScoreBoardSection from "./scoreBoardSection";
import TieHistorySection from "./tieHistorySection";
import GameOptionsSection from "./gameOptionsSection";
import GameBoardSection from "./gameBoardSection";
import { Client } from '@stomp/stompjs';

interface State {

}

const mapStateToProps = (state: RootState) => ({
  currentGame: state.game.currentGame,
  playerInSession: state.system.systemPlayer,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => ({
  onMakeMove: (move: Move) => dispatch(callMakeMove(move)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type GamePageProps = ConnectedProps<typeof connector>

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

  private canPlay() {
    const currentPlayer = this.props.playerInSession;
    const playerTag = this.props.currentGame.currentPlayerTurn;
    const playerToPlay = playerTag == X_TAG ? this.props.currentGame.playerX : this.props.currentGame.playerO;

    return currentPlayer.id === playerToPlay.id;
  }

  render() {
    return (
      <Container fluid className="page gamePage">
        <h1>XandO</h1>
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
      </Container>
    );
  }
}

export default connector(GamePage)