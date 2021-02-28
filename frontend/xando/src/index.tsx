import React, { ChangeEvent } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import reportWebVitals from './reportWebVitals';
import GameLobbyPage, { GameCreationConfig, JoinGameConfig } from './pages/home/home';

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

const onCreateGame = (config: GameCreationConfig) => {
  console.log("Attempting to create game with config", config);
}

const onJoinGame = (config: JoinGameConfig) => {
  console.log("Attempting to join a game with config", config);
}

ReactDOM.render(
  <React.StrictMode>
    <GameLobbyPage
      playerTagOptions={playerTagOptions}
      onCreateGame={onCreateGame}
      onJoinGame={onJoinGame}
      playerName=""
    />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
