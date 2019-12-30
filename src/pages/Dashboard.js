import React, {Component} from "react";
import {Redirect} from "react-router";
import styled from "styled-components";
import DashboardLayout from "../layout/DashboardLayout";
import Tasks from "./Tasks";
import NavBar from "../components/NavBar";
import axios from "axios";
import {displayNotification, CURRENT_USER_URL} from "../utils/utils";
import SideBar from "./SideBar";
import ReactNoticifaction from "react-notifications-component";

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
            showSideBar: false,
            menuOption: 'All task',
            text: ''
        }
    }

    componentDidMount() {
        this.handleGetUser();
        this.setState({
            textIsEmpty: this.state.text === ''
        })
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
            showSideBar: !prevState.showSideBar,
            text: ''
        }));
        this.child.childToggle();
    };

    handleMenuClick = (prop) => {
        this.setState({menuOption: prop})
    };

    handleSearchTextChange = (prop) => {
        this.setState({text: prop})
    };

    render() {
        return (
            <>
                <ReactNoticifaction />
                {this.props.loggedIn ?
                    <DashboardLayout>

                        <NavBar
                            displaySideBar={this.displaySideBar}
                            ref={instance => {this.child = instance}}
                            search={this.handleSearchTextChange}
                        />


                        <DashboardWrapper>
                            <Tasks
                                userId={this.state.user.id}
                                menuOption={this.state.menuOption}
                                text={this.state.text}
                                handleLogout={this.props.handleLogout}
                            />
                        </DashboardWrapper>

                        {this.state.showSideBar &&
                            <SideBar
                                click={this.handleMenuClick}
                                displaySideBar={this.displaySideBar}
                                handleLogout={this.props.handleLogout}
                            />
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