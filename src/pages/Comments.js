import React, {Component} from "react";
import axios from "axios";
import {COMMENTS_BY_TASK} from "../utils/utils";
import CommentsForm from "../components/CommentsForm";
import CommentsCard from "../components/CommentsCard";
import styled from "styled-components";

const Footer = styled.div`
  margin-bottom: 20px;
`;

class Comments extends Component {
    state = {
        comments: []
    };

    getCommentsByTask = () => {
            axios
                .get(COMMENTS_BY_TASK,
                    {
                        params: {
                            "taskId": this.props.taskId
                        },
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": localStorage.getItem('token')
                        }
                    })
                .then((res) => {
                    this.setState({
                        comments: res.data
                    });
                    this.sortComments();
                })
                .catch(err => {
                    console.log(err);
                    this.props.handleLogout();
                });
    };

    sortComments = () => {
        const {comments} = this.state;

        const compareDateDESC = (a,b) => {
            if (a.creationDate > b.creationDate) return -1;
            if (a.creationDate < b.creationDate) return 1;
            return 0;
        };

        this.setState({
            tasks: comments.sort(compareDateDESC)
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.taskId !== prevProps.taskId) {
            this.getCommentsByTask();
        }
    }

    componentDidMount() {
        this.getCommentsByTask();
    }

    render() {
        const {comments} = this.state;
        const {taskId, handleLogout, userId} = this.props;

        return (
            <>
                <CommentsForm
                    getCommentsByTask={this.getCommentsByTask}
                    handleLogout={handleLogout}
                    taskId={taskId}
                    userId={userId}
                />

                {comments.length ?
                    comments
                        .map(({id, author, creationDate, content}) => (
                            <CommentsCard
                                key={id}
                                id={id}
                                author={author}
                                creationDate={creationDate}
                                content={content}
                                userId={userId}
                                taskId={taskId}
                                getCommentsByTask={this.getCommentsByTask}
                                handleLogout={handleLogout}
                            />
                        ))
                    : null
                }

                <Footer />
            </>
        );
    }
}

export default Comments;