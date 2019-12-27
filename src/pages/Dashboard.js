import React, {Component} from "react";
import {Redirect} from "react-router";
import styled from "styled-components";
import DashboardLayout from "../layout/DashboardLayout";
import Tasks from "./Tasks";
import NavBar from "../components/NavBar";
import axios from "axios";
import {displayNotification, CURRENT_USER_URL} from "../utils/utils";
import SideBar from "./SideBar";

const DashboardWrapper = styled.div`
  height: auto;
  min-height: calc(100vh - 70px);
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({theme}) => theme.color.background};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;

`;

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                id: 0,
                email: '',
                username: localStorage.getItem('username'),
                firstName: '',
                lastName: '',
                timeZone: '',
                photo: ''
            },
            showSideBar: false
        }
    }

    componentDidMount() {
        this.handleGetUser();
    }

    handleGetUser = () => {
        axios.get(CURRENT_USER_URL, {
            params: {
                username: localStorage.getItem('username')
            },
            headers: {
                "Content-Type": 'application/json',
                "Authorization": localStorage.getItem('token')
            }
        })
            .then(res => {
                const {id, email, firstName, lastName, timeZone, photo} = res.data;

                if(res.status === 200) {
                    this.setState({
                        user: {
                            ...this.state.user,
                            id: id,
                            email: email,
                            firstName: firstName,
                            lastName: lastName,
                            timeZone: timeZone,
                            photo: photo
                        }
                    });
                }
            })
            .catch(err => {
                    if (!err.response) {
                        // connection refused
                        // this.errorStatus = 'Network Error';
                        displayNotification("Server is not responding. Try again later.", "danger");
                    } else {
                        // 403
                        // this.errorStatus = err.response.status;
                        // displayNotification("Invalid username or password", "warning");
                        this.props.handleLogout();
                    }

                }
            );
    };

    displaySideBar = () => {
        this.setState(prevState => ({
            showSideBar: !prevState.showSideBar
        }))
    };

    render() {
        return (
            <>
                {this.props.loggedIn ?
                    <DashboardLayout>

                        <NavBar displaySideBar={this.displaySideBar}/>


                        <DashboardWrapper>
                            <Tasks
                                userId={this.state.user.id}
                                handleLogout={this.props.handleLogout}
                            />
                        </DashboardWrapper>

                        {this.state.showSideBar &&
                            <SideBar />
                        }

                    </DashboardLayout>
                    :
                    <Redirect to="/login" />
                }
            </>
        );
    }
}

export default Dashboard;