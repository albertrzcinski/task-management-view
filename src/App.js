import React, {Component} from 'react';
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import RecoveryPage from "./pages/RecoveryPage";
import {Route, BrowserRouter as Router, Redirect} from "react-router-dom";

export const LoginContext = React.createContext({
    loggedIn: false
});

class App extends Component{
    handleLogout = () => {
        localStorage.removeItem('username');
        this.setState({
            loggedIn: false
            //user: {}
    });
    };

    handleLogin = (username) => {
        localStorage.setItem('username', `${username}`);
        this.setState({
            loggedIn: true
            //user: data.user
        });
    };

    state = {
        loggedIn: localStorage.getItem('username') != null,
        handleLogin: this.handleLogin,
        handleLogout: this.handleLogout
    };

  render() {
      const {Provider} = LoginContext;

      return (
      <>

          <Provider value={this.state}>
          <Router>
              <Route path="/signUp" component={SignUpPage}/>
              <Route path="/login">
                  <LoginPage
                      //handleLogin={this.handleLogin}
                  />
              </Route>
              <Route path="/recovery" component={RecoveryPage} />
              <Route exact path="/">
                  {this.state.loggedIn ? <Redirect to="/dashboard"/> : <Redirect to="/login"/>}
              </Route>
          </Router>
          </Provider>
      </>
      )
  }
}

export default App;
