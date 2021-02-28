import React, { ChangeEvent } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import { store } from './store/store';
import reportWebVitals from './reportWebVitals';
import GameLobbyPage from './pages/home/home';
import { GameCreationConfig, JoinGameConfig, PLAYER_TAG_OPTIONS } from './application/types'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GameLobbyPage/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
