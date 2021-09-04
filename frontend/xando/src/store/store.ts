import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history';

import { systemReducer } from './system/reducers';
import { gameReducer } from './game/reducers';
import { GameActions, GameState } from './game/types';
import { SystemActions, SystemState } from './system/types';
import { RouteComponentProps } from 'react-router';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  system: systemReducer,
  game: gameReducer,
});

export const history = createBrowserHistory();
export const rootReducer = createRootReducer(history);

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      routerMiddleware(history)
      )));

export type Actions = GameActions | SystemActions;