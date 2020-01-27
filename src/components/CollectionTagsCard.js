import React, {Component} from "react";
import styled, {css} from "styled-components";
import Button from "./Button";
import posed from "react-pose";
import RenameForm from "./RenameForm";
import axios from "axios";
import {
    ADD_TAG_TO_TASK,
    CHANGE_COLLECTION,
    DELETE_COLLECTION,
    DELETE_TAG,
    displayNotification, REMOVE_TAG_FROM_TASK
} from "../utils/utils";

const TaskWrapper = styled.div`
  margin: 10px 0 5px 0;
  width: 100%;
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
  
    ${({theme}) => theme.media.desktop} {
    width: 70%;
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
  width: 70%;
  ${sharedCss}
`;

const StyledButton = styled(Button)`
  width: 40%;
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
        isRename: false,
        isDefault: true
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
        if (type === "Collections" && window.confirm("This operation will delete all task in this collection. Do you want to continue ?")) {
            axios
                .delete(DELETE_COLLECTION,
                    {
                        params: {
                            id: this.props.id
                        },
                        headers: {
                            "Content-Type": 'application/json',
                            "Authorization": localStorage.getItem('token')
                        }
                    })
                .then(() => {
                    displayNotification("Collection has been deleted.", "danger");
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
        }
        else if(type === "Tags") {
            axios
                .delete(DELETE_TAG,
                    {
                        params: {
                            id: this.props.id
                        },
                        headers: {
                            "Content-Type": 'application/json',
                            "Authorization": localStorage.getItem('token')
                        }
                    })
                .then(() => {
                    displayNotification("Tag has been deleted.", "danger");
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
        }
    };

    handleCollectionChoose = async (taskId, collectionId) => {
        await axios
            .post(CHANGE_COLLECTION,
                {
                    "taskId": taskId,
                    "collectionId": collectionId
                }, {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": localStorage.getItem('token')
                    }
                })
            .then(() => {
                this.props.reloadTasks();
            })
            .catch(err => {
                console.log(err);
                this.props.handleLogout();
            });
    };

    handleTagsAdd = (taskId, tagId) => {
        axios
            .post(ADD_TAG_TO_TASK,
                {
                    "taskId": taskId,
                    "tagId": tagId
                }, {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": localStorage.getItem('token')
                    }
                })
            .then(() => {
                this.props.reloadTasks();
            })
            .catch(err => {
                console.log(err);
                this.props.handleLogout();
            });
    };

    handleTagsRemove = (taskId, tagId) => {
        axios
            .post(REMOVE_TAG_FROM_TASK,
                {
                    "taskId": taskId,
                    "tagId": tagId
                }, {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": localStorage.getItem('token')
                    }
                })
            .then(() => {
                this.props.reloadTasks();
            })
            .catch(err => {
                console.log(err);
                this.props.handleLogout();
            });
    };

    componentDidMount() {
        if(this.props.isCollections || this.props.isTags || this.props.isSelectedTaskTags)
            this.setState({
                isDefault: false
            })

    }

    render() {
        const {id, title, click, menuOption, handleLogout, userId, getData,
            isCollections, selectedTaskId, isTags, isSelectedTaskTags} = this.props;
        const {isOpen, isRename, isDefault} = this.state;
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

                    {isDefault && title === 'Inbox' &&
                        <>
                        <StyledTaskButton onClick={() => click(title)}> Show tasks </StyledTaskButton>
                        <ButtonsWrapper/>
                        </>
                    }

                    {isDefault && title !== 'Inbox' &&
                        <>
                            <StyledTaskButton onClick={() => click(title)}> Show tasks </StyledTaskButton>

                            <ButtonsWrapper>
                                <StyledButton isBlue onClick={() => this.toggleIsRename()}> Rename </StyledButton>
                                <StyledButton isRed onClick={() => this.handleDelete(menuOption)}> Delete </StyledButton>
                            </ButtonsWrapper>
                        </>
                    }

                    {isCollections &&
                        <>
                            <StyledTaskButton
                                onClick={() => {
                                    this.props.menuClick("Edit");
                                    this.handleCollectionChoose(selectedTaskId,id).then();
                                }}
                            >
                                Choose
                            </StyledTaskButton>
                            <ButtonsWrapper/>
                        </>
                    }

                    {isTags &&
                        <>
                            <StyledTaskButton
                                onClick={() => {
                                    this.props.menuClick("Edit");
                                    this.handleTagsAdd(selectedTaskId,id)
                                }}
                            >
                                Add to task
                            </StyledTaskButton>
                            <ButtonsWrapper/>
                        </>
                    }

                    {isSelectedTaskTags &&
                        <>
                            <StyledTaskButton isRed
                                onClick={() => {
                                    this.props.menuClick("Edit");
                                    this.handleTagsRemove(selectedTaskId,id)
                                }}
                            >
                                Remove from task
                            </StyledTaskButton>
                            <ButtonsWrapper/>
                        </>
                    }
                </PosedTaskWrapper>
            </>
        );
    }
}

export default CollectionTagsCard
