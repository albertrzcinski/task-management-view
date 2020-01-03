import React, {Component} from "react";
import styled, {css} from "styled-components";
import Button from "./Button";
import posed from "react-pose";
import RenameForm from "./RenameForm";
import axios from "axios";
import {DELETE_COLLECTION, DELETE_TAG, displayNotification} from "../utils/utils";

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

const P = styled.p`
  padding-left: 20px;
  font-size: 1.1em;
  font-weight: 500;
`;

const PTaskWrapper = styled(TaskWrapper)`
  flex-direction: column;
  align-items: center;
  padding-top: 17.6px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  justify-content: space-between;
  margin: 10px 0 10px 0;
`;

const sharedCss = css`
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
  font-size: 0.85em;
  height: 35px;
`;

const StyledTaskButton = styled(Button)`
  width: 70vw;
  ${sharedCss}
`;

const StyledButton = styled(Button)`
  width: 100px;
  ${sharedCss} 
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


class CollectionTagsCard extends Component {
    state = {
        isOpen: false,
        isRename: false
    };

    toggleIsOpen = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }))
    };

    toggleIsRename = () => {
        this.setState(prevState => ({
            isRename: !prevState.isRename
        }))
    };

    handleDelete = (type) => {
        axios
            .delete(type === "Collections" ? DELETE_COLLECTION : DELETE_TAG,
                {
                    params:{
                        id: this.props.id
                    },
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": localStorage.getItem('token')
                    }
                })
            .then(() => {
                displayNotification("Deleted.", "danger");
                this.props.getData(this.props.menuOption);
            })
            .catch(err => {
                if (!err.response) {
                    // connection refused
                    displayNotification("Server is not responding. Try again later.", "danger");
                } else {
                    // 403
                    this.props.handleLogout();
                }
            });
    };

    render() {
        const {id, title, click, menuOption, handleLogout, userId, getData} = this.props;
        const {isOpen, isRename} = this.state;
        return (
            <>
                <TaskWrapper
                    tabIndex="1"
                    onClick={() => this.toggleIsOpen()}
                    isOpen={isOpen}
                    isRename={isRename}
                >
                    {!isRename ?
                        <P> {title}</P>
                        :
                        <RenameForm
                            title={title}
                            menuOption={menuOption}
                            id={id}
                            handleLogout={handleLogout}
                            userId={userId}
                            toggleIsRename={this.toggleIsRename}
                            getData={getData}
                        />
                    }
                </TaskWrapper>
                <PosedTaskWrapper pose={isOpen ? 'open' : 'closed'}>

                    <StyledTaskButton onClick={() => click(title)}> Show tasks </StyledTaskButton>

                    <ButtonsWrapper>
                        <StyledButton isBlue onClick={() => this.toggleIsRename()}> Rename </StyledButton>
                        <StyledButton isRed onClick={() => this.handleDelete(menuOption)}> Delete </StyledButton>
                    </ButtonsWrapper>
                </PosedTaskWrapper>
            </>
        );
    }
}

export default CollectionTagsCard