import React, {Component} from "react";
import styled from "styled-components";
import axios from "axios";
import {ADD_DEPENDENT_TASK, displayNotification, TASKS_BY_OWNER_URL} from "../utils/utils";
import TaskCard from "../components/TaskCard";
import Button from "../components/Button";
import DigitDiv from "../components/DigitDiv";

const TitleWrapper = styled.div`
  margin-top: 20px;
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

const H4 = styled.h3`
  margin: 0;
`;

const H5 = styled.h5`
  width: 70%;
`;

const StyledDiv = styled.div`
  position: relative;
  display: flex;
  width: 80%;
  margin: 20px auto 20px auto;
  
  & > div {
    margin: 0;
  }
  
    ${({theme}) => theme.media.desktop} {
       margin: 20px auto 20px 0;
       width: 40%;
     }
`;

const StyledButton = styled(Button)`
  width: 75px;
  height: 30px;
  font-size: 0.9em;
  
  :last-child{
    margin-left: 5px;
  }
`;

class DependentTasks extends Component {
    state = {
        tasks: [],
        isAdd: false,
        dependentTasks: [],
        click: 1
    };

    getTasks =  () => {
        axios
            .get( TASKS_BY_OWNER_URL,
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
                    this.setState({
                        tasks: res.data
                    });
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

    addDependentTask = async (taskId, dependentId) => {
        await axios
            .post( ADD_DEPENDENT_TASK,
                {
                    "taskId": taskId,
                    "dependentId": dependentId
                },
                {
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": localStorage.getItem('token')
                    }
                })
            .then(() => {
                this.getTasks();
            })
            .catch((err) => {
                if (!err.response) {
                    // connection refused
                    displayNotification("Server is not responding. Try again later.", "danger");
                } else {
                    console.log(err);
                    // 403
                    this.props.handleLogout();
                }
            });
    };

    toggleIsAdd = () => {
        this.setState(prevState => ({
            isAdd: !prevState.isAdd
        }))
    };

    componentDidMount() {
        setTimeout(() => {
            this.getTasks();
        },500);
    }

    render() {
        const {tasks, isAdd, click} = this.state;
        const {menuOption, text} = this.props;

        return (
            <TasksWrapper>
                <TitleWrapper>
                <H4> {menuOption} </H4>
                    {!isAdd ?
                        <StyledButton isWhite onClick={() => this.toggleIsAdd()}>
                            Add
                        </StyledButton>
                        :
                        <div>
                            <StyledButton
                                isWhite
                                onClick={() => {
                                    const {dependentTasks} = this.state;
                                    this.toggleIsAdd();

                                    if(dependentTasks.length < 2)
                                        this.setState({
                                            dependentTasks: new Array(0),
                                            click: 1
                                        });

                                    for (let i = 1; i < dependentTasks.length; ++i) {
                                        this.addDependentTask(dependentTasks[i].id, dependentTasks[i-1].id).then(() => {
                                                if (dependentTasks.length - i < 2) {
                                                    displayNotification("Dependency successfully added", "success");
                                                    this.setState({
                                                        dependentTasks: new Array(0),
                                                        click: 1
                                                    })
                                                }
                                            }
                                        )
                                    }
                                }}
                            >
                                Save
                            </StyledButton>

                            <StyledButton
                                isWhite
                                onClick={() => {
                                    this.toggleIsAdd();
                                    this.setState({
                                        dependentTasks: new Array(0),
                                        click: 1
                                    })
                                }}
                            >
                                Cancel
                            </StyledButton>
                        </div>
                    }
                </TitleWrapper>

                {isAdd &&
                    <H5>
                        Select the tasks in the correct order. From first to do to last to do.
                    </H5>
                }

                {isAdd &&
                    tasks.length ?
                    tasks
                        .filter(task => task.title.toLowerCase().includes(text.toLowerCase()))
                        .filter(t => t.complete === false)
                        .map(
                            (task) => (
                                <StyledDiv
                                    key={task.id}
                                    onClick={(e) => {
                                        e.currentTarget.style.border="2px solid cornflowerblue";
                                        e.currentTarget.style.pointerEvents="none";

                                        this.setState(prevState => ({
                                            dependentTasks: prevState.dependentTasks.concat(task),
                                            click: prevState.click+1
                                        }))
                                    }}
                                >
                                    <TaskCard
                                        isDependent
                                        id={task.id}
                                        title={task.title}
                                        desc={task.description}
                                        creationDate={task.creationDate}
                                        tags={task.tags}
                                    />
                                    <DigitDiv number={click}/>
                                </StyledDiv>
                            ))
                    :
                    <h5>
                        You don't have any dependent task.
                    </h5>
                }
            </TasksWrapper>
        );
    }
}

export default DependentTasks;
