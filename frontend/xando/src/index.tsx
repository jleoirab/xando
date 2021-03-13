import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import { store } from './store/store';
import reportWebVitals from './reportWebVitals';
import GameLobbyPage from './pages/home/home';
import GamePage from './pages/game/game';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <GameLobbyPage/> */}
      <GamePage/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
