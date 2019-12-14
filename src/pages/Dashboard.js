import React from "react";
import Button from "../components/Button";
import LoginLayout from "../layout/LoginLayout";
import {Redirect} from "react-router";
import {userAll} from "../utils/utils";
import axios from "axios";

const getUsers = async (props) => {
    await axios.get(userAll,
        {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": localStorage.getItem('token')
            }
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        .catch(props.handleLogout);
};

const Dashboard = (props) => {
  return (
      <>
          {props.loggedIn ?
              <LoginLayout>
                <h2>
                    Hello {localStorage.getItem('username')}
                </h2>

                  <Button isWhite onClick={() => getUsers(props)}>
                      Show users
                  </Button>

                  <br />

                <Button onClick={props.handleLogout}>
                    Logout
                </Button>
              </LoginLayout>
              :
              <Redirect to="/login" />
          }
      </>
  );
};

export default Dashboard;