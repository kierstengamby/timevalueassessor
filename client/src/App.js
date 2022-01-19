import React, { Component } from 'react';
import SiteBar from './home/Navbar';
import Auth from './components/Auth/Auth';
import Splash from './home/Splash';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch
} from 'react-router-dom';



class App extends Component {
  constructor() {
    super();
    this.state = {
      sessionToken: ''
    }
  }

  componentWillMount() {
    const token = localStorage.getItem('token');
    if (token && !this.state.sessionToken) {
      this.setState({ sessionToken: token });
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
    if (this.state.sessionToken === localStorage.getItem('token')) {
      return(
        <Switch>
          <Route path='/' exact>
            <Splash sessionToken={this.state.sessionToken} />
          </Route>
        </Switch>
      )
    } else {
      return (
        <Switch>
          <Route path='/' exact>
            <Auth setToken={this.setSessionState} />
          </Route>
        </Switch>
      )
    }
  }

  render () {
    return (
      <Router>
        <div>
          <SiteBar clickLogout={this.logout} />
          {this.protectedViews()}
        </div>
      </Router>
    )
  };
}


// import Auth from './components/Auth/Auth';
// import "bootstrap/dist/css/bootstrap.css"

// class App extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       sessionToken: '',
//       newToken: '',
//     };
//   }

//   render() {
//     return (
//       <div>
  
//         {/* {protectedViews()} */}
//       </div>
//     );
//   }

// }

//   useEffect(() => {
//     if (localStorage.getItem('token')) {
//       setSessionToken(localStorage.getItem('token'));
//     }
//   }, [])

//   const updateToken = (newToken) => {
//     localStorage.setItem('token', newToken);
//     setSessionToken(newToken);
//     console.log(newToken);
//   }

//   const clearToken = () => {
//     localStorage.clear();
//     setSessionToken('');
//   }

//   const protectedViews = () => {
//     return (sessionToken === localStorage.getItem('token') ?
//       <BudgetAccordian sessionToken={sessionToken} clearToken={clearToken} />
//       : <Auth updateToken={updateToken} />)
//   }

  
// }

export default App;