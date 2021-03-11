import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import ContextProvider from './context/redux';
import Main from './views/main';
import LogIn from './views/login';
import SignUp from './views/signup';

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/login" component={LogIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/home" component={Main} />
            <Redirect from="/" to="/login" />
          </Switch>
        </Router>
      </div>
    </ContextProvider>
  );
}

export default App;
