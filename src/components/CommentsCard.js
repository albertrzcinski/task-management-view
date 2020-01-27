import React, {Component} from "react";
import styled, {css} from "styled-components";
import ContentEditable from "react-contenteditable";
import axios from "axios";
import {DELETE_COMMENTS, displayNotification, SAVE_COMMENTS} from "../utils/utils";

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: -8px;
  
  ${props => props.isEdit &&
    css`
      justify-content: flex-end;
      margin-bottom: auto;
    `}
  
`;

const P = styled.p`
  font-size: 0.9em;
  font-weight: 600;
  color: ${({theme}) => theme.color.blue}
`;

const sharedCss = css`
    opacity: 70%;
    text-align: right;
    margin: 2px 0 0 0;
    padding-right: 10px;
`;

const Span = styled(P)`
  margin-left: 5px;
  font-size: 0.7em;
  margin-bottom: 7px;
  padding: 3px;
  
  ${props => props.isEdit &&
    css`
      ${sharedCss}
    `}
  
  ${props => props.isDelete &&
    css`
      color: ${({theme}) => theme.color.red}
      ${sharedCss}
    `}
`;


const StyledContentEditable = styled(ContentEditable)`
  outline: none;
  padding: 5px 5px 5px 10px;
  font-size: 0.9em;
  border: solid 1px ${({theme}) => theme.color.border};
  border-radius: 5px;
  opacity: 85%;
  
  &:focus{
    opacity: 100%;
  }
`;

class CommentsCard extends Component {
    constructor(props) {
        super(props);
        this.editable = React.createRef();
        this.state = {
            content: '',
            isDisabled: true,
            isEdit: false
        }
    }

    handleChangeDesc = (e) => {
        this.setState({
            content: e.target.value
        })
    };

    toggleIsDisabled = () => {
        this.setState(prevState => ({
            isDisabled: !prevState.isDisabled
        }))
    };

    saveComment = () => {
        axios
            .post(SAVE_COMMENTS,
                {
                    "id": this.props.id,
                    "creationDate": new Date().toJSON(),
                    "content": this.state.content,
                    "author": {
                        "id": this.props.userId
                    },
                    "task": {
                        "id": this.props.taskId
                    }
                }, {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": localStorage.getItem('token')
                    }
                })
            .then(() => {
                this.props.getCommentsByTask();
            })
            .catch(err => {
                console.log(err);
                this.props.handleLogout();
            });
    };

    deleteComment = () => {
        axios
            .delete(DELETE_COMMENTS,
                {
                    params: {
                        "id": this.props.id
                    },
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": localStorage.getItem('token')
                    }
                })
            .then(() => {
                displayNotification("Comment deleted.", "danger");
                this.props.getCommentsByTask();
            })
            .catch(err => {
                console.log(err);
                this.props.handleLogout();
            });
    };

    componentDidMount() {
        this.setState({
            content: this.props.content
        })
    }

    render() {
        const {author, userId} = this.props;

        const date = new Date(this.props.creationDate);
        const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        const due = `${date.toDateString()} at ${hours}:${minutes}`;

        const isButton = userId === author.id;

        return (
            <>
                {author.firstName && author.lastName ?
                    <Row>
                        <P> {author.firstName} {author.lastName} </P> <Span> {due} </Span>
                    </Row>
                    :
                    <Row>
                        <P> {author.username} </P> <Span> {due} </Span>
                    </Row>
                }

                <div
                    ref={this.editable}
                    onBlur={() => {
                        this.saveComment();
                        this.setState({
                            isEdit: false
                        })
                    }}
                >

                    <StyledContentEditable
                        html={this.state.content}
                        disabled={this.state.isDisabled}
                        onChange={this.handleChangeDesc}
                    />
                </div>

                {isButton ?
                    <Row isEdit>
                        <Span
                            isEdit
                            onClick={() => {
                                this.toggleIsDisabled();
                            }}
                        >
                            Edit
                        </Span>
                        <Span
                            isDelete
                            onClick={() => this.deleteComment()}
                        >
                            Delete
                        </Span>
                    </Row>
                    : null
                }
            </>
        )
    }
}

export default CommentsCard;
