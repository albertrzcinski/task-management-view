import React, {Component} from "react";
import TaskCard from "../components/TaskCard";
import Button from "../components/Button";
import styled, {css} from "styled-components";
import axios from "axios";
import {TASKS_BY_OWNER_URL} from "../utils/utils";
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
            numericDown: true,
            alphaDown: true,
            tasks: []
        };
    }

    toggleNumeric = () => {
        //TODO sort task
        this.setState(prevState => ({
            numericDown: !prevState.numericDown
        }))
    };

    toggleAlpha = () => {
        //TODO sort task
        this.setState(prevState => ({
            alphaDown: !prevState.alphaDown
        }))
    };

    getTasks(){
        axios.get(TASKS_BY_OWNER_URL,
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
                })
            })
            .catch(this.props.handleLogout)
    };

    componentDidMount() {
        setTimeout(() => {
            this.getTasks();
        },100);

    }

    render() {
        const {handleLogout} = this.props;

        return (
            <>
                <TitleWrapper>
                    <H3> All tasks </H3>
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

                {this.state.tasks.length ?
                    this.state.tasks.map(
                    ({id, title, description, creationDate, tags}) => (
                            <TaskCard
                                key={id}
                                title={title}
                                desc={description}
                                dueDate={creationDate}
                                tags={tags}
                            />
                    ))
                    :
                    <h4>
                        You don't have any task to do.
                    </h4>
                }

                {/*<TaskCard trash/>*/}

                <Button onClick={handleLogout}>
                    Logout
                </Button>
            </>
        );
    }
}

export default Tasks;