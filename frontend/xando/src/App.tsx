import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import {
  Route,
  Switch
} from 'react-router-dom';
import { store, history } from './store/store';
import HomePage from './pages/homev2/home';
import GamePage from './pages/game/game';

import JoinGamePage from './pages/joinGame/joinGame';
import { HeaderV1 } from "./components/headerv1/header";

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <HeaderV1/>
        <Switch>
          <Route path="/games/:gameId/join" component={JoinGamePage} />
          <Route path="/games/:gameId" component={GamePage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
