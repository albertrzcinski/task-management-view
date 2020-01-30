import React, {Component} from 'react';
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import RecoveryPage from "./pages/RecoveryPage";
import {BrowserRouter as Router} from "react-router-dom";
import {Route, Redirect, Switch} from "react-router"
import axios from "axios";
import {displayNotification, LOGIN_URL} from "./utils/utils";
import Dashboard from "./pages/Dashboard";
import Page404 from "./pages/Page404";

class App extends Component{
    handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        this.setState({
            loggedIn: false
    });
    };

    handleLogin = async (credentials, setSubmitting) => {
        await axios.post(LOGIN_URL, {
            username: credentials.username,
            password: credentials.password
        })
            .then(res => {
                if(res.status === 200) {
                    localStorage.setItem('token', `${res.headers.authorization}`);
                    localStorage.setItem('username', `${credentials.username}`);
                    setSubmitting(false);
                    this.setState({
                        loggedIn: true
                    });
                }
                })
            .catch(err => {
                    if (!err.response) {
                        // connection refused
                        // this.errorStatus = 'Network Error';
                        displayNotification("Server is not responding. Try again later.", "danger");
                        setSubmitting(false);
                    } else {
                        // 403
                        // this.errorStatus = err.response.status;
                        displayNotification("Invalid username or password", "warning");
                        setSubmitting(false);
                    }

            }
            );
    };

    state = {
        loggedIn: localStorage.getItem('username') != null
    };

  render() {
      return (
      <>
          <Router>
              <Switch>
                  <Route path="/signUp" component={SignUpPage}/>
                  <Route path="/login">
                      <LoginPage
                          loggedIn={this.state.loggedIn}
                          handleLogin={this.handleLogin}
                      />
                  </Route>
                  <Route path="/recovery" component={RecoveryPage} />
                  <Route path="/dashboard">
                      <Dashboard
                          loggedIn={this.state.loggedIn}
                          handleLogout={this.handleLogout}
                      />
                  </Route>
                  <Route exact path="/">
                      {this.state.loggedIn ? <Redirect to="/dashboard"/> : <Redirect to="/login"/>}
                  </Route>
                  <Route path="*">
                      <Page404 />
                  </Route>
              </Switch>
          </Router>
      </>
      )
  }
}

export default App;
