import React, {Component} from "react";
import styled, {css} from "styled-components";
import Tag from "../components/Tag";
import CloseMark from "../components/CloseMark";
import ContentEditable from 'react-contenteditable'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../components/Button";
import CollectionTags from "./CollectionTags";
import axios from "axios";
import {
    CHANGE_DATE,
    CHANGE_DESCRIPTION,
    CHANGE_TITLE,
    DELETE_DEPENDENT_TASKS,
    displayNotification
} from "../utils/utils";
import Members from "./Members";
import Comments from "./Comments";

/*const TitleWrapper =styled.div`
  display: flex;
  flex-direction: column;
  width: 65vw;
`;*/

const P = styled.p`
  font-size: 1.2em;
  margin-bottom: 10px;
  color: ${({theme}) => theme.color.blue}
  
  ${props => props.members &&
    css`
      margin-top: 12.2px;
    `}
`;

const Span = styled.span`
  font-size: 0.8em;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 75vw;
  margin-top: -5px;
`;

const TagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 80vw;
`;

const Photo = styled.img`
  border-radius: 50px;
  border: 1px solid ${({theme}) => theme.color.brighterBlue};
  background-size: contain;
  width: 40px;
  height: 40px;
  
  ${({blank}) =>
    blank &&
    css`
       border: none;
       margin-bottom: 0;
    `};
`;

const StyledDatePicker = styled(DatePicker)`
  padding: 10px;
  border: 1px solid ${({theme}) => theme.color.brighterBlue};
  background-color: ${({theme}) => theme.color.white};
  opacity: 80%;
  cursor: pointer;
  border-radius: 5px;
  outline: none;

  :hover{
    box-shadow: 0 0 3px 0 rgba(0,0,0,0.2);
     opacity: 100%
  }
`;

const TitleContentEditable = styled(ContentEditable)`
  outline: none;
  padding: 10px;
  font-size: 1.3em;
  margin-top: 9.2px;
  color: ${({theme}) => theme.color.blue};
  
  &:focus{
    border: solid 1px ${({theme}) => theme.color.text};
    border-radius: 5px;
    background-color: ${({theme}) => theme.color.white};
  }
`;

const Row = styled.div`
  display: inline-block;
`;

const StyledContentEditable = styled(ContentEditable)`
  outline: none;
  padding: 10px;
  margin-top: -8px;
  font-size: 0.9em;
  
  &:focus{
    border: solid 1px ${({theme}) => theme.color.text};
    border-radius: 5px;
    background-color: ${({theme}) => theme.color.white};
  }
`;

const Ol = styled.ol`
  margin: 0 0 13px 0;
  font-size: 0.9em;
`;

const Additions = styled.div`
  margin-top: 10px;
  
  & > * {
    margin-bottom: 10px;
    box-shadow: 3px 3px 7px -5px ${({theme}) => theme.color.text};
    cursor: pointer;
  }
`;

class TaskEdit extends Component {
    constructor(props) {
        super(props);
        this.editable = React.createRef();
        this.title = React.createRef();
        this.state = {
            selectedTask: this.props.selectedTask,
            // oldSelectedTask: '',
            desc: 'Add a more detailed description...'
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.selectedTask !== prevProps.selectedTask)
            this.setState({
                selectedTask: this.props.selectedTask
            });
        // console.log(prevProps.selectedTask);
    }
/*
    componentWillUnmount() {
        const {selectedTask, oldSelectedTask} = this.state;
        if(selectedTask.description !== oldSelectedTask.description){
            selectedTask.description = oldSelectedTask.description;
            this.props.handleChangeSelectedTaskState(selectedTask)
        }

        console.log(selectedTask.dueDate);
        console.log(oldSelectedTask.dueDate);

        if(selectedTask.dueDate !== oldSelectedTask.dueDate){
            selectedTask.dueDate = oldSelectedTask.dueDate;
            this.props.handleChangeSelectedTaskState(selectedTask)
        }
    }

    componentDidMount() {
        let selectedTask = this.state.selectedTask;
        this.setState({
            oldSelectedTask: selectedTask
        })
    }*/

    handleChangeTitle = (e) => {
        const {selectedTask} = this.state;
        selectedTask.title = e.target.value;
        this.setState({
            selectedTask: selectedTask
        });
    };

    handleChangeDesc = (e) => {
        this.setState({
            desc: e.target.value
        });

        const {selectedTask} = this.state;
        selectedTask.description = e.target.value;
        this.setState({
            selectedTask: selectedTask
        });
    };

    saveDescription = () => {
        const {selectedTask} = this.state;

        let desc;
        if(selectedTask.description) {
            desc = selectedTask.description.replace(/<div>/gi, " ");
            desc = desc.replace(/<\/div>/gi, " ");
            desc = desc.replace(/<br>/gi, " ");
        }

        axios
            .post(CHANGE_DESCRIPTION,
                {
                    "taskId": selectedTask.id,
                    "desc": desc
                }, {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": localStorage.getItem('token')
                    }
                })
            .then(() => {
                // displayNotification("Description changed.", "success");
                this.props.reloadTasks();
            })
            .catch(err => {
                console.log(err);
                this.props.handleLogout();
            });
    };

    saveTitle = () => {
        axios
            .post(CHANGE_TITLE,
                {
                    "taskId": this.state.selectedTask.id,
                    "title": this.state.selectedTask.title
                }, {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": localStorage.getItem('token')
                    }
                })
            .then(() => {
                // displayNotification("Title changed.", "success");
                this.props.reloadTasks();
            })
            .catch(err => {
                console.log(err);
                this.props.handleLogout();
            });
    };

    saveDate = () => {
        axios
            .post(CHANGE_DATE,
                {
                    "taskId": this.state.selectedTask.id,
                    "dueDate": this.state.selectedTask.dueDate
                }, {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": localStorage.getItem('token')
                    }
                })
            .then(() => {
                // displayNotification("Title changed.", "success");
                this.props.reloadTasks();
            })
            .catch(err => {
                console.log(err);
                this.props.handleLogout();
            });
    };

    handleChangeDate = (date) => {
        const {selectedTask} = this.state;
        selectedTask.dueDate = date.toJSON();

        this.setState({
            selectedTask: selectedTask
        });

        this.saveDate();
    };

    handleDeleteDependentTask = () => {
        axios
            .post(DELETE_DEPENDENT_TASKS,null,
                {
                    params: {
                        taskId: this.state.selectedTask.id
                    },
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": localStorage.getItem('token')
                    }
                })
            .then(() => this.props.reloadTasks())
            .catch(err => {
                console.log(err);
                this.props.handleLogout();
            });
    };

    render() {
        const {selectedTask, desc} = this.state;

        const {isShared, menuOption} = this.props;
         //console.log(selectedTask);
/*        const hours = dueDate.getHours() < 10 ? `${dueDate.getHours()}0` : dueDate.getHours();
        const minutes = dueDate.getMinutes() < 10 ? `${dueDate.getMinutes()}0` : dueDate.getMinutes();
        const due = `${dueDate.toDateString()} at ${hours}:${minutes}`;*/
        let dependent = selectedTask;
        const list = [];

        while (dependent.overridingTask !== null) {
            list.push(<li key={dependent.overridingTask.id}> {dependent.overridingTask.title} </li>);
            dependent = dependent.overridingTask;
        }

        return (
            <>
                {menuOption !== "isCollection"  &&
                    menuOption !== "isTags" &&
                    menuOption !== "isMembers" &&
                    <>
                    {/*
                    //TODO add on desktop
                    <CloseMark/>*/}

                        {!isShared ?
                            <div
                                onBlur={() => {
                                    this.saveTitle();
                                }}
                            >
                                <TitleContentEditable
                                    innerRef={this.title}
                                    html={selectedTask.title}
                                    disabled={false}
                                    onChange={this.handleChangeTitle}
                                />
                            </div>
                            :
                            <TitleContentEditable
                                innerRef={this.title}
                                html={selectedTask.title}
                                disabled={true}
                            />
                        }

                        <Span>collection <b>{selectedTask.setOfTasks.name}</b></Span>


                    <Wrapper>
                        {selectedTask.tags.length ?
                            <>
                            <P> Tags </P>
                            <TagWrapper>
                                {selectedTask.tags.map((tag) => (
                                    <Tag isBig key={tag.id} name={tag.name}/>
                                ))}
                            </TagWrapper>
                            </>
                            : null
                        }

                        {selectedTask.members.length ?
                            <>
                            <P members> Members </P>
                            <TagWrapper>
                                {selectedTask.members.map(({id, photo, username}) => (
                                    <Photo
                                        key={id}
                                        src={photo ?
                                            `data:image/*.*;base64,${photo}`
                                            : 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D'}
                                        alt={username}
                                        title={username}
                                    />
                                ))}
                            </TagWrapper>
                            </>
                            : null
                        }

                        {selectedTask.dueDate &&
                            <>

                                <P> Due </P>

                                <Row>
                                    {!isShared ?
                                        <>
                                        <StyledDatePicker
                                            selected={new Date(selectedTask.dueDate)}
                                            onChange={this.handleChangeDate}
                                            dateFormat="d MMMM, yyyy  'at'  HH:mm"
                                            timeFormat="HH:mm"
                                            showTimeSelect
                                            timeIntervals={15}
                                        />
                                        <CloseMark
                                            due
                                            onClick={() => {
                                                const {selectedTask} = this.state;
                                                selectedTask.dueDate = null;
                                                this.setState({
                                                    selectedTask: selectedTask
                                                });
                                                this.saveDate();
                                            }}
                                        />
                                        </>
                                        :
                                        <StyledDatePicker
                                            selected={new Date(selectedTask.dueDate)}
                                            dateFormat="d MMMM, yyyy  'at'  HH:mm"
                                            disabled={true}
                                        />
                                    }
                                </Row>
                            </>
                        }


                        {!isShared &&
                            <>
                                <P> Description </P>
                                <div
                                    onBlur={() => {
                                        this.saveDescription();
                                    }}
                                >
                                    <StyledContentEditable
                                        innerRef={this.editable}
                                        html={selectedTask.description === null ? desc : selectedTask.description}
                                        disabled={false}
                                        onChange={this.handleChangeDesc}
                                    />
                                </div>
                            </>
                        }
                        {isShared && selectedTask.description !== null &&
                            <>
                                <P> Description </P>
                                <StyledContentEditable
                                    innerRef={this.editable}
                                    html={selectedTask.description}
                                    disabled={true}
                                />
                            </>
                        }

                        {selectedTask.overridingTask &&
                            <>
                                <P> Dependent Tasks </P>
                                <Ol>
                                    {list}
                                </Ol>
                            </>
                        }


                        {!isShared &&
                            <Additions>
                                {!selectedTask.dueDate &&
                                <Button
                                    isWhite
                                    onClick={() => {
                                        const {selectedTask} = this.state;
                                        selectedTask.dueDate = new Date().toJSON();
                                        this.setState({
                                            selectedTask: selectedTask
                                        })
                                    }}
                                >
                                    Due date
                                </Button>
                                }

                                <Button
                                    isWhite
                                    onClick={() => this.props.menuClick("isTags")}
                                >
                                    Tags
                                </Button>

                                <Button
                                    isWhite
                                    onClick={() => this.props.menuClick("isMembers")}
                                >
                                    Members
                                </Button>

                                <Button
                                    isWhite
                                    onClick={() => this.props.menuClick("isCollection")}
                                >
                                    Move to...
                                </Button>

                                <Button
                                    isWhite
                                    onClick={() => this.handleDeleteDependentTask()}
                                >
                                    Delete dependent tasks
                                </Button>

                            </Additions>
                        }

                        <P> Comments </P>
                        <Comments
                            taskId={selectedTask.id}
                            userId={this.props.userId}
                            handleLogout={this.props.handleLogout}
                        />

                    </Wrapper>
                    </>
                }

                {menuOption === "isTags" &&
                    <CollectionTags
                        isTags
                        tags={this.props.tags}
                        selectedTask={selectedTask}
                        handleLogout={this.props.handleLogout}
                        reloadTasks={this.props.reloadTasks}
                        menuClick={this.props.menuClick}
                    />
                }

                {menuOption === "isCollection" &&
                    <CollectionTags
                        isCollections
                        collections={this.props.collections}
                        selectedTask={selectedTask}
                        handleLogout={this.props.handleLogout}
                        reloadTasks={this.props.reloadTasks}
                        menuClick={this.props.menuClick}
                    />
                }

                {menuOption === "isMembers" &&
                    <Members
                        selectedTask={selectedTask}
                        handleLogout={this.props.handleLogout}
                        reloadTasks={this.props.reloadTasks}
                        userId={this.props.userId}
                        menuClick={this.props.menuClick}
                    />
                }
            </>
        );
    }
}

export default TaskEdit;