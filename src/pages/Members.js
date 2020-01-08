import React, {Component} from "react";
import axios from "axios"
import {ALL_USERS} from "../utils/utils";
import MembersCard from "../components/MembersCard";

class Members extends Component{
    state = {
        allUsers: []
    };

    getUsers = () => {
        axios
            .get(ALL_USERS,
                {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": localStorage.getItem('token')
                    }
            })
            .then(res => {
                this.setState({
                    allUsers: res.data
                })
            })
            .catch((e) => {
                console.log(e);
                this.props.handleLogout()
            })
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.members !== prevProps.members)
            this.setState({
                members: this.props.members,
            });
    }

    componentDidMount() {
        setTimeout(() => {
            this.getUsers()
        },200);
    }

    render() {
        const {handleLogout, selectedTask, reloadTasks, userId, menuClick} = this.props;
        const {allUsers} = this.state;

        return (
            <>
                {selectedTask.members.length ?
                    <h4>Current members</h4>
                    : null
                }

                {selectedTask.members.length ?
                        selectedTask.members
                            .map(({id, username, firstName, lastName, photo}) => (
                                <MembersCard
                                    isSelectedTaskMembers
                                    key={id}
                                    id={id}
                                    username={username}
                                    firstName={firstName}
                                    lastName={lastName}
                                    //click={click}
                                    //menuOption={menuOption}
                                    handleLogout={handleLogout}
                                    selectedTaskId={selectedTask.id}
                                    reloadTasks={reloadTasks}
                                    photo={photo}
                                    menuClick={menuClick}
                                />
                            ))
                        : null
                }

                {allUsers.length ?
                    <>
                        <h4>Other users</h4>
                        <div><></></div>
                    </>
                    : null
                }

                {allUsers.length ?
                    allUsers
                            .filter(user => {
                                let selectedMembers = selectedTask.members.filter(sm => sm.id === user.id);
                                if(selectedMembers.length)
                                    return null;

                                return user;
                            })
                            .filter(user => user.id !== userId)
                            .map(({id, username, firstName, lastName, photo}) => (
                                <MembersCard
                                    key={id}
                                    id={id}
                                    username={username}
                                    firstName={firstName}
                                    lastName={lastName}
                                    //click={click}
                                    //menuOption={menuOption}
                                    handleLogout={handleLogout}
                                    selectedTaskId={selectedTask.id}
                                    reloadTasks={reloadTasks}
                                    photo={photo}
                                    menuClick={menuClick}
                                />
                            ))
                        :
                        <h4>
                            You don't have any users to choose.
                        </h4>
                }
            </>

        );
    }
}

export default Members;