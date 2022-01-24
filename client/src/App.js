import React, { Component } from 'react';
import NavBar from './home/Navbar';
import Auth from './components/Auth/Auth';
import Splash from './home/Splash';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch
} from 'react-router-dom';
import "./app.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      sessionToken: localStorage.getItem('token'),
      tasks:[],
      time: []
    }
  }

  setSessionState = (token) => {
    localStorage.setItem('token', token);
    this.setState({ sessionToken: token });
  }

  logout = () => {
    this.setState({
        sessionToken: '',
    });
    localStorage.clear();
}

  protectedViews = () => {
    if (localStorage.getItem('token')) {
      return(
        <Switch>
          <Route path='/' exact>
            <Splash tasks={this.state.tasks} sessionToken={this.state.sessionToken} time={this.state.time} />
          </Route>
        </Switch>
      )
    } else {
      return (
        <Switch>
          <Route path='/' exact>
            <Auth setToken={(token) => this.setSessionState(token)} />
          </Route>
        </Switch>
      )
    }
  }

  render () {
    return (
      <Router>
        <div>
          <NavBar clickLogout={this.logout}/>
          {this.protectedViews()}
        </div>
      </Router>
    )
  };
}

export default App;