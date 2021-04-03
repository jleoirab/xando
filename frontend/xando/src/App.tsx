import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import {
  Route,
  Switch
} from 'react-router-dom';
import { store, history } from './store/store';
import GameLobbyPage from './pages/home/home';
import GamePage from './pages/game/game';
import JoinGameLobby from './pages/game/joinGameLobby';

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/games/:gameId/join" component={JoinGameLobby} />
          <Route path="/games/:gameId" component={GamePage} />
          <Route path="/" component={GameLobbyPage} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
