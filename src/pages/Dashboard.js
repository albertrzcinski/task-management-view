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
import Account from "./Account";
import CollectionTags from "./CollectionTags";

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
        this.navBarRef = React.createRef();
        this.collectionTagsRef = React.createRef();

        this.state = {
            user: {
                id: 0,
                email: '',
                username: localStorage.getItem('username'),
                firstName: '',
                lastName: '',
                photo: null
            },
            showSideBar: false,
            menuOption: 'All task',
            text: '',
        }
    }

    componentDidMount() {
        this.handleGetUser().then();
        this.setState({
            textIsEmpty: this.state.text === ''
        })
    }

    handleGetUser = async () => {
       await axios.get(CURRENT_USER_URL, {
            params: {
                username: localStorage.getItem('username')
            },
            headers: {
                "Content-Type": 'application/json',
                "Authorization": localStorage.getItem('token')
            }
        })
            .then(res => {
                const {id, username, email, firstName, lastName, photo} = res.data;

                if(res.status === 200) {
                    this.setState({
                        user: {
                            id: id,
                            username: username,
                            email: email,
                            firstName: firstName,
                            lastName: lastName,
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

    handleGetCollectionTags = (prop) => {
        this.collectionTagsRef.current.getCollectionTagsData(prop);
    };

    displaySideBar = () => {
        this.setState(prevState => ({
            showSideBar: !prevState.showSideBar,
            text: ''
        }));
        this.navBarRef.current.childToggle();
    };

    handleMenuClick = (prop) => {
        this.setState({menuOption: prop});
    };

    handleSearchTextChange = (prop) => {
        this.setState({text: prop})
    };

    closeAccount = () => {
        //TODO do zmiany na desktop
        this.setState({menuOption: 'All task'});
    };

    render() {
        const {user, menuOption, text, showSideBar} = this.state;
        const {loggedIn, handleLogout} = this.props;

        return (
            <>
                <ReactNoticifaction />
                {loggedIn ?
                    <DashboardLayout>

                        <NavBar
                            displaySideBar={this.displaySideBar}
                            ref={this.navBarRef}
                            search={this.handleSearchTextChange}
                            menuOption={menuOption}
                            userId={user.id}
                            handleLogout={handleLogout}
                            handleGetCollectionTags={this.handleGetCollectionTags}
                        />


                        <DashboardWrapper>
                            {menuOption !== "Collections" &&
                                menuOption !== "Tags" &&
                                menuOption !== "Settings" &&
                                <Tasks
                                    userId={user.id}
                                    menuOption={menuOption}
                                    text={text}
                                    handleLogout={handleLogout}
                                />}
                            {menuOption === "Settings" &&
                                <Account
                                    user={user}
                                    closeAccount={this.closeAccount}
                                    handleLogout={handleLogout}
                                    handleGetUser={this.handleGetUser}
                                />}
                            {menuOption === "Collections" &&
                                <CollectionTags
                                    text={text}
                                    userId={user.id}
                                    handleLogout={handleLogout}
                                    menuOption={menuOption}
                                    click={this.handleMenuClick}
                                    ref={this.collectionTagsRef}
                                />
                            }
                            {menuOption === "Tags" &&
                                <CollectionTags
                                    text={text}
                                    userId={user.id}
                                    handleLogout={handleLogout}
                                    menuOption={menuOption}
                                    click={this.handleMenuClick}
                                    ref={this.collectionTagsRef}
                                />
                            }
                        </DashboardWrapper>

                        {showSideBar &&
                            <SideBar
                                click={this.handleMenuClick}
                                displaySideBar={this.displaySideBar}
                                handleLogout={handleLogout}
                                displayAccount={this.displayAccount}
                                photo={user.photo}
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