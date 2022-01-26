import React, { Component } from 'react';
import NavBar from './home/Navbar';
import Auth from './components/Auth/Auth';
import Splash from './home/Splash';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import "./app.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      sessionToken: localStorage.getItem('token'),
      tasks: [],
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
      return (
        <Container fluid>
          <Row>
            <Col>
              <Switch>
                <Route path='/' exact>
                  <Splash tasks={this.state.tasks} sessionToken={this.state.sessionToken} time={this.state.time} />
                </Route>
              </Switch>
            </Col>
          </Row>
        </Container>
      )
    } else {
      return (
        <Container fluid>
          <Row>
            <Col>
              <Switch>
                <Route path='/' exact>
                  <Auth setToken={(token) => this.setSessionState(token)} setLoginToken={(token) => this.setSessionState(token)}/>
                </Route>
              </Switch>
            </Col>
          </Row>
        </Container>
      )
    }
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <Router>
              <div>
                <NavBar clickLogout={this.logout} />
                {this.protectedViews()}
              </div>
            </Router>
          </Col>
        </Row>
      </Container>
    )
  };
}

export default App;