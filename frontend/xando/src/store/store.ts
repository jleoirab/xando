import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { systemReducer } from './system/reducers';
import { gameReducer } from './game/reducers';
import { GameActions } from './game/types';
import { SystemActions } from './system/types';


export const rootReducer = combineReducers({
  system: systemReducer,
  game: gameReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type Actions = GameActions | SystemActions;