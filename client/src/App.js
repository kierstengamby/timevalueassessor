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
    this.fetchTasks(localStorage.getItem('token'));
    this.state = {
      sessionToken: localStorage.getItem('token'),
      tasks:[],
      time: []
    }
  }

  fetchTasks = (sessionToken) => {
    fetch("http://localhost:9000/tasks/", {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': sessionToken
        })
    }).then((res) => res.json())
    .then((tasksData) => {
        console.log(tasksData)
        this.setState({ tasks: tasksData })
        return tasksData
    })
}

fetchTime = (sessionToken) => {
  fetch("http://localhost:9000/timevalue/", {
      method: 'GET',
      headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': sessionToken
      })
  }).then((res) => res.json())
  .then((timeData) => {
      this.setState({ time: timeData })
      return timeData
  })
}


  // async componentDidMount() {
  //   const response = await fetch('http://localhost:9000/tasks/', {
  //     headers: new Headers({
  //       'Content-Type': 'application/json',
  //       'Authorization': localStorage.getItem('token')
  //     })
  //   });
  //   const json = await response.json();
  //   this.setState({ tasks: json })
  //   console.log("json");
  //   console.log(json);
  // }

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
            <Splash tasks={this.state.tasks} sessionToken={this.state.sessionToken} fetchMoreTasks={(token) => this.fetchTasks(token)} time={this.state.time} fetchMoreTime={(token) => this.fetchTime(token)}/>
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
          <SiteBar clickLogout={this.logout} />
          {this.protectedViews()}
        </div>
      </Router>

      //! Move this inside the other render
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