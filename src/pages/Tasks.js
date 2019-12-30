import React, {Component} from "react";
import TaskCard from "../components/TaskCard";
import styled, {css} from "styled-components";
import axios from "axios";
import {COMPLETE_TASK, DELETE_TASK, displayNotification, TASKS_BY_MEMBER_URL, TASKS_BY_OWNER_URL} from "../utils/utils";
import {FaSortAlphaDown, FaSortAlphaUp, FaSortNumericDown, FaSortNumericUp} from "react-icons/fa";

const TitleWrapper = styled.div`
  margin: 10px 0 -5px 0;
  width: 85vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const H3 = styled.h3`
  margin: 0;
`;

const sharedCss = css`
  padding: 10px;
  height: 2.5em;
  width: 2.5em;
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
            numericDown: false,
            alphaDown: false,
            tasks: [],
            sharedTasks: []
        };
    }

    toggleNumeric = () => {
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

        if(numericDown) {
            tasks.sort(compareDateASC);
            sharedTasks.sort(compareDateASC);
        }
        else {
            tasks.sort(compareDateDESC);
            sharedTasks.sort(compareDateDESC);
        }
        this.setState(prevState => ({
            numericDown: !prevState.numericDown
        }))
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
            tasks.sort(compareTitleASC);
            sharedTasks.sort(compareTitleASC);
        }
        else {
            tasks.sort(compareTitleDESC);
            sharedTasks.sort(compareTitleDESC);
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
            .then(res => {
                if(menuOption === "Shared") {
                    this.setState({
                        sharedTasks: res.data,
                    });
                }
                else {
                    this.setState({
                        tasks: res.data,
                    });
                    this.toggleNumeric();
                }
            })
            .catch(this.props.handleLogout)
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
        const {menuOption, text} = this.props;
        const {tasks, sharedTasks} = this.state;

        return (
            <>
                <TitleWrapper>
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
                                ({id, title, description, creationDate, tags}) => (
                                    menuOption === "Complete" ?
                                        <TaskCard
                                            key={id}
                                            id={id}
                                            title={title}
                                            desc={description}
                                            //TODO change due date
                                            dueDate={creationDate}
                                            tags={tags}
                                            trash
                                            handleDelete={this.handleDelete}
                                            handleComplete={this.handleComplete}
                                        />
                                    :
                                        <TaskCard
                                            key={id}
                                            id={id}
                                            title={title}
                                            desc={description}
                                            //TODO change due date
                                            dueDate={creationDate}
                                            tags={tags}
                                            handleComplete={this.handleComplete}
                                            complete
                                        />
                            ))
                        :
                        <h4>
                            You don't have any task to do.
                        </h4>
                    :
                        sharedTasks.length ?
                            sharedTasks
                                .filter(task => task.title.toLowerCase().includes(text.toLowerCase()))
                                .map(
                                    ({id, title, description, creationDate, tags}) => (
                                        <TaskCard
                                            key={id}
                                            id={id}
                                            title={title}
                                            desc={description}
                                            //TODO change due date
                                            dueDate={creationDate}
                                            tags={tags}
                                        />
                                    )
                                )
                            :
                            <h4>
                                You don't have any task to do.
                            </h4>

                }
            </>
        );

        function whichTask(t) {
            const {dueDate, complete} = t;

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
            } else return complete === false;
        }
    }
}

export default Tasks;