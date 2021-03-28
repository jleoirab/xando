import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { store } from './store/store';
import GameLobbyPage from './pages/home/home';
import GamePage from './pages/game/game';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/games/:gameId" component={GamePage} />
          <Route path="/" component={GameLobbyPage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
