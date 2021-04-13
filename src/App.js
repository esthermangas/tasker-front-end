import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ContextProvider from './context/redux';
import Main from './views/main';
import LogIn from './views/login';
import SignUp from './views/signup';
import PrivateRoute from './utils/privateRoute';

function App() {
  return (
    <ContextProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="App">
          <Router>
            <Switch>
              <Route exact path="/login" component={LogIn} />
              <Route path="/signup" component={SignUp} />
              <PrivateRoute path="/app" component={Main} />
              <Redirect from="/" to="/login" />
            </Switch>
          </Router>
        </div>
      </MuiPickersUtilsProvider>
    </ContextProvider>
  );
}

export default App;
