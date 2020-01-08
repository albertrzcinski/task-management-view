import React, {Component} from "react";
import styled, {css} from "styled-components";
import posed from "react-pose";
import Button from "./Button";
import axios from "axios";
import {displayNotification, MEMBER_ADD_TO_TASK, MEMBER_REMOVE_FROM_TASK} from "../utils/utils";

const TaskWrapper = styled.div`
  margin: 10px 0 5px 0;
  width: 80vw;
  height: auto;
  background-color: ${({theme}) => theme.color.white};
  box-shadow: 0 0 7px 0 rgba(0,0,0,0.2);
  border-radius: 5px;
  cursor: pointer;
  
  :hover {
    border: 1px solid cornflowerblue;
  }
  
  ${props => props.isOpen &&
    css`
    border-top: 1px solid cornflowerblue;
    border-left: 1px solid cornflowerblue;
    border-right: 1px solid cornflowerblue;
    border-bottom: ${props => props.isOpen ? 'none' : '1px solid cornflowerblue'};
    box-shadow: 0 -2px 7px 0 rgba(0,0,0,0.2);
    outline: none;
    margin-bottom: 1px;
  `}
  
  ${props => props.isRename &&
    css`
    pointer-events: none;
  `}
  
  &:focus{
    outline: none;
  }
  
  :nth-child(2n+1){
    margin: 0;
    box-shadow: 0 2px 7px 0 rgba(0,0,0,0.2);
    outline: none;
    border: 1px solid cornflowerblue;
    border-top: none;
  }
`;

const Photo = styled.img`
  border-radius: 50px;
  border: 1px solid ${({theme}) => theme.color.brighterBlue};
  background-size: contain;
  width: 40px;
  height: 40px;
`;

const P = styled.p`
  padding-left: 20px;
  font-size: 1.1em;
  font-weight: 500;
`;

const Span = styled.span`
  font-size: 0.8em;
  font-weight: unset;
`;

const PTaskWrapper = styled(TaskWrapper)`
  flex-direction: column;
  align-items: center;
  padding-top: 17.6px;
`;

const PosedTaskWrapper= posed(PTaskWrapper)({
    closed: {
        applyAtEnd: { display: 'none', y: '-100%' },
        opacity: 0
    },
    open: {
        applyAtStart: {display: 'flex', y:0},
        opacity: 1
    }
});

const StyledTaskButton = styled(Button)`
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
  font-size: 0.85em;
  height: 35px;
  width: 70vw;
`;

const ButtonsWrapper = styled.div`
  margin: 10px 0 10px 0;
`;

class MembersCard extends Component {
    state = {
      isOpen: false
    };

    toggleIsOpen = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }))
    };

    handleMemberRemove = (taskId, memberId) => {
        axios
            .post(MEMBER_REMOVE_FROM_TASK,
                {
                    "taskId": taskId,
                    "memberId": memberId
                }, {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": localStorage.getItem('token')
                    }
                })
            .then(() => {
                //displayNotification("Member removed.", "danger");
                this.props.reloadTasks();
            })
            .catch(err => {
                console.log(err);
                this.props.handleLogout();
            });
    };

    handleMemberAdd = (taskId, memberId) => {
        axios
            .post(MEMBER_ADD_TO_TASK,
                {
                    "taskId": taskId,
                    "memberId": memberId
                }, {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": localStorage.getItem('token')
                    }
                })
            .then(() => {
                //displayNotification("Member added.", "success");
                this.props.reloadTasks();
            })
            .catch(err => {
                console.log(err);
                this.props.handleLogout();
            });
    };

    render() {
        const {firstName, lastName, username, isSelectedTaskMembers, selectedTaskId, id, photo, menuClick} = this.props;
        const {isOpen} = this.state;

        return (
            <>
                <TaskWrapper
                    tabIndex="1"
                    onClick={() => this.toggleIsOpen()}
                >
                    {firstName && lastName && photo ?
                        <>
                            <div>
                            <Photo
                                src={photo ?
                                    `data:image/*.*;base64,${photo}`
                                    : 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D'}
                                alt={username}
                                title={username}
                            />
                                </div>
                        <P>{`${firstName} ${lastName}`} <Span>{`(${username})`}</Span> </P>
                        </>
                        : firstName && lastName ?
                            <>
                                <P>{`${firstName} ${lastName}`} <Span>{`(${username})`}</Span> </P>
                            </>
                            :
                            <P>{username}</P>
                    }
                </TaskWrapper>
                <PosedTaskWrapper pose={isOpen ? 'open' : 'closed'}>


                {isSelectedTaskMembers ?
                <>
                <StyledTaskButton
                    isRed
                    onClick={() => {
                        menuClick("Edit");
                        this.handleMemberRemove(selectedTaskId,id)
                    }}
                >
                    Remove from task
                </StyledTaskButton>

                <ButtonsWrapper/>
                </>
                :
                <>
                    <StyledTaskButton
                        onClick={() => {
                            menuClick("Edit");
                            this.handleMemberAdd(selectedTaskId,id)
                        }}
                    >
                        Add to task
                    </StyledTaskButton>
                    <ButtonsWrapper/>
                </>
                }
                </PosedTaskWrapper>
            </>
        )
    }
}

export default MembersCard;