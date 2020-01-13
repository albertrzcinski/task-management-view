import React, {Component} from "react";
import TaskCard from "../components/TaskCard";
import styled, {css} from "styled-components";
import axios from "axios";
import {COMPLETE_TASK, DELETE_TASK, displayNotification, TASKS_BY_MEMBER_URL, TASKS_BY_OWNER_URL} from "../utils/utils";
import {FaSortAlphaDown, FaSortAlphaUp, FaSortNumericDown, FaSortNumericUp} from "react-icons/fa";
import TaskEdit from "./TaskEdit";
import posed from "react-pose";

const TitleWrapper = styled.div`
  margin: 10px 0 -5px 0;
  width: 85%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TasksWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 90%;
  margin: 0 auto;
  
  ${({theme}) => theme.media.desktop} {
      justify-content: flex-start;
      align-items: center;
      width: 60%;
      padding-left: 50px;
      margin: 0;
  }   
`;

const TaskEditWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 70px;
  background-color: silver;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  min-height: calc(100vh - 70px);
  border-radius: 15px;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.3);
  
  ${({theme}) => theme.media.tablet} {
      top: 80px;
      left: 240px;
      width: calc(100% - 240px);
  }   
  
  ${({theme}) => theme.media.desktop} {
      top: 150px;
      left: calc(240px + (100% - 240px)*0.6);
      width: 30%;
      min-height: auto;
      padding-bottom: 20px;
  }  
`;

const PosedTaskEditWrapper = posed(TaskEditWrapper)({
    hidden: {
        applyAtStart: { display: 'none'},
        opacity: 0
    },
    visible: {
        applyAtEnd: {display: 'flex'},
        opacity: 1
    }
});

const H3 = styled.h3`
  margin: 0;
`;

const sharedCss = css`
  padding: 10px;
  height: 2.5em;
  width: 2.5em;
  cursor: pointer;
`;

const StyledFaSortNumericDown = styled(FaSortNumericDown)`
  ${sharedCss}
`;

const StyledFaSortNumericUp = styled(FaSortNumericUp)`
  ${sharedCss}
`;

const StyledFaSortAlphaDown = styled(FaSortAlphaDown)`
  ${sharedCss};
  margin-right: 0;
`;

const StyledFaSortAlphaUp = styled(FaSortAlphaUp)`
  ${sharedCss};
  margin-right: 0;
`;

class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numericDown: true,
            alphaDown: false,
            tasks: [],
            sharedTasks: [],
            selectedTask: [],
            editOption: ''
        };
    }

    toggleNumeric = (get) => {
        const {tasks, sharedTasks, numericDown} = this.state;

        const compareDateASC = (a,b) => {
            if (a.creationDate < b.creationDate) return -1;
            if (a.creationDate > b.creationDate) return 1;
            return 0;
        };
        const compareDateDESC = (a,b) => {
            if (a.creationDate > b.creationDate) return -1;
            if (a.creationDate < b.creationDate) return 1;
            return 0;
        };

        if(get !== true) {
            if (numericDown) {
                this.setState({
                   tasks: tasks.sort(compareDateASC),
                   sharedTasks: sharedTasks.sort(compareDateASC)
                });
            } else {
                this.setState({
                    tasks: tasks.sort(compareDateDESC),
                    sharedTasks: sharedTasks.sort(compareDateDESC)
                });
            }
            this.setState(prevState => ({
                numericDown: !prevState.numericDown
            }))
        } else {
            this.setState({
               tasks: tasks.sort(compareDateDESC)
            });
        }
    };

    toggleAlpha = () => {
        const {tasks, sharedTasks, alphaDown} = this.state;

        const compareTitleASC = (a,b) => {
            if (a.title.toUpperCase() < b.title.toUpperCase()) return -1;
            if (a.title.toUpperCase() > b.title.toUpperCase()) return 1;
            return 0;
        };
        const compareTitleDESC = (a,b) => {
            if (a.title.toUpperCase() > b.title.toUpperCase()) return -1;
            if (a.title.toUpperCase() < b.title.toUpperCase()) return 1;
            return 0;
        };

        if(!alphaDown) {
            this.setState({
                tasks: tasks.sort(compareTitleASC),
                sharedTasks: sharedTasks.sort(compareTitleASC)
            })
        }
        else {
            this.setState({
                tasks: tasks.sort(compareTitleDESC),
                sharedTasks: sharedTasks.sort(compareTitleDESC)
            })
        }
        this.setState(prevState => ({
            alphaDown: !prevState.alphaDown
        }))
    };

    getTasks = (menuOption) => {
        axios
            .get(menuOption === "Shared" ? TASKS_BY_MEMBER_URL : TASKS_BY_OWNER_URL,
            {
                params: {
                    userId: this.props.userId
                },
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": localStorage.getItem('token')
                }
            })
            .then(async res => {
                if(menuOption === "Shared") {
                    this.setState({
                        sharedTasks: res.data
                    });
                }
                else {
                    this.setState({
                        tasks: res.data
                    });

                    await this.toggleNumeric(true);


                    if(this.state.selectedTask !== undefined && Object.keys(this.state.selectedTask).length > 0) {
                        let selectedTask = res.data.filter(t => t.id === this.state.selectedTask.id);
                        this.setState({
                            selectedTask: selectedTask[0]
                        })
                    }
                }
            })
            .catch((err) => {
                if (!err.response) {
                    console.log(err);
                    // connection refused
                    displayNotification("Server is not responding. Try again later.", "danger");
                } else {
                    // 403
                    this.props.handleLogout();
                }
            });
    };

    handleComplete = (id) => {
        axios
            .post(COMPLETE_TASK,null,
                {
                    params:{
                        taskId: id
                    },
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": localStorage.getItem('token')
                    }
                })
            .then((res) => {
                res.data ?
                    displayNotification("Task has been moved to complete.", "success")
                    :
                    displayNotification("Task has been restore to collection.", "success");
                this.getTasks();
            })
            .catch(this.props.handleLogout);


    };

    handleDelete = (id) => {
        axios
            .delete(DELETE_TASK, {
                    params:{
                        taskId: id
                    },
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": localStorage.getItem('token')
                    }
                })
            .then(() => {
                displayNotification("Task has been deleted.", "danger");
                this.getTasks();
            })
            .catch(this.props.handleLogout);
    };

    handleChangeSelectedTaskState = (task) => {
      this.setState({
          selectedTask: task
      })
    };

    handleChangeEditOption = (option) => {
        this.setState({
            editOption: option
        })
    };

    componentDidMount() {
        setTimeout(() => {
            this.getTasks();
        },100);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.menuOption !== prevProps.menuOption
            && this.props.menuOption === "Shared"
            && this.state.sharedTasks.length < 1)
            this.getTasks(this.props.menuOption);
    }

    render() {
        const {menuOption, text, click, handleLogout, userId, isShared, handleChangeIsClick} = this.props;
        const {tasks, sharedTasks, selectedTask, editOption} = this.state;

        //tasks.map(({setOfTasks}) => (console.log(setOfTasks.name)));

        return (
            <>
                <TasksWrapper>
                    <TitleWrapper menuOption={menuOption}>
                        <H3> {menuOption} </H3>
                        <div>
                      <span onClick={this.toggleNumeric}>
                          {this.state.numericDown ?
                              <StyledFaSortNumericDown/>
                              : <StyledFaSortNumericUp/>}
                      </span>

                            <span onClick={this.toggleAlpha}>
                          {this.state.alphaDown ?
                              <StyledFaSortAlphaDown/>
                              : <StyledFaSortAlphaUp/>}
                      </span>
                        </div>
                    </TitleWrapper>


                {menuOption !== "Shared" ?
                    tasks.length ?
                        tasks
                            .filter(whichTask)
                            .filter(task => task.title.toLowerCase().includes(text.toLowerCase()))
                            .map(
                                (task) => (
                                    menuOption === "Complete" ?
                                        <TaskCard
                                            key={task.id}
                                            id={task.id}
                                            title={task.title}
                                            desc={task.description}
                                            //TODO change due date
                                            dueDate={task.creationDate}
                                            tags={task.tags}
                                            trash
                                            handleDelete={this.handleDelete}
                                            handleComplete={this.handleComplete}
                                        />
                                        :
                                        <TaskCard
                                            key={task.id}
                                            id={task.id}
                                            title={task.title}
                                            desc={task.description}
                                            //TODO change due date
                                            dueDate={task.creationDate}
                                            tags={task.tags}
                                            handleComplete={this.handleComplete}
                                            complete
                                            dependentTask={task.overridingTask}
                                            onClick={() => {
                                                this.setState({
                                                    selectedTask: task,
                                                    editOption: "Edit"
                                                });
                                            }}
                                        />
                                ))
                    :
                    <h4>
                        You don't have any task to do.
                    </h4>
                    : null
                }

                {menuOption === "Shared" ?
                    sharedTasks.length ?
                        sharedTasks
                            .filter(task => task.title.toLowerCase().includes(text.toLowerCase()))
                            .map(
                                (task) => (
                                    <TaskCard
                                        key={task.id}
                                        id={task.id}
                                        title={task.title}
                                        desc={task.description}
                                        //TODO change due date
                                        dueDate={task.creationDate}
                                        tags={task.tags}
                                        onClick={() => {
                                            this.setState({
                                                selectedTask: task,
                                                editOption: "Edit"
                                            });
                                            handleChangeIsClick(true);
                                        }}
                                    />
                                )
                            )
                    :
                    <h4>
                        You don't have any task to do.
                    </h4>
                    : null
                }
                </TasksWrapper>

                <PosedTaskEditWrapper pose={editOption === "Edit"|| editOption === "isCollection" ||
                editOption === "isTags" ||
                editOption === "isMembers" ? 'visible' : 'hidden'}
                >
{/*                <TaskEditWrapper>*/}
                    {editOption === "Edit" || editOption === "isCollection" ||
                        editOption === "isTags" ||
                        editOption === "isMembers" ?
                        <TaskEdit
                            selectedTask={selectedTask}
                            handleChangeSelectedTaskState={this.handleChangeSelectedTaskState}
                            collections={this.props.collections}
                            tags={this.props.tags}
                            menuOption={editOption}
                            handleLogout={handleLogout}
                            reloadTasks={this.getTasks}
                            userId={userId}
                            isShared={isShared}
                            menuClick={this.handleChangeEditOption}
                        />
                        : null
                    }
                {/*</TaskEditWrapper>*/}
                </PosedTaskEditWrapper>

            </>
        );

        function whichTask(t) {
            const {dueDate, complete, setOfTasks, tags} = t;

            let filteredTags = [];

            if(tags.length)
                filteredTags = tags.filter(tag => tag.name === menuOption);

            if(menuOption === "All task")
                return complete === false;

            if (menuOption !== "All task") {
                let currentDate = new Date();
                let due = new Date(dueDate);

                if (menuOption === "Today") {
                    return (due.toLocaleDateString() === currentDate.toLocaleDateString())
                        && complete === false;
                }
                else if (menuOption === "Tomorrow") {
                    currentDate.setDate(currentDate.getDate() + 1);
                    return (due.toLocaleDateString() === currentDate.toLocaleDateString())
                        && complete === false;
                }
                else if (menuOption === "Complete") {
                    return complete === true;
                }
            }

            if(setOfTasks.name === menuOption)
                return setOfTasks.name === menuOption && complete === false;

            if(filteredTags.length) {
                if(filteredTags[0].name === menuOption)
                    return filteredTags[0].name === menuOption && complete === false;
            }
        }
    }
}

export default Tasks;