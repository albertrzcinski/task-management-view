import React, {Component} from "react";
import styled from "styled-components";
import {Form, Formik} from "formik";
import {FormikField} from "../layout/theme";
import Button from "./Button";
import axios from "axios";
import {SAVE_COMMENTS} from "../utils/utils";

const Row = styled.div`
  margin-bottom: 5px;
  padding: 0 5px 0 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${({theme}) => theme.color.border};
  border-radius: 5px;
  opacity: 80%;
  transition: opacity .3s ease-in-out, border-color .3s ease-in-out;
`;

const StyledFormikField = styled(FormikField)`
  padding: 0 20px 0 10px;
  font-size: 0.8em;
  width: 100%;
  min-width: 1px;
  border: none;
`;

const StyledSaveButton = styled(Button)`
  box-shadow: 0 0 3px 0 rgba(0,0,0,0.2);
  font-size: 0.85em;
  height: 35px;
  width: 100px;
  border: .8px solid ${({theme}) => theme.color.blue};
`;

const saveComments = (props, values, setSubmitting) => {
    axios
        .post(SAVE_COMMENTS,
            {
                "creationDate": new Date().toJSON(),
                "content": values.content,
                "author": {
                    "id": props.userId
                },
                "task": {
                    "id": props.taskId
                }
            }, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": localStorage.getItem('token')
                }
            })
        .then(() => {
            setSubmitting(false);
            props.getCommentsByTask();
        })
        .catch(err => {
            console.log(err);
            props.handleLogout();
        });
};

class CommentsForm extends Component{
    state = {
        isButton: false
    };

    isButton = (type) => {
        this.setState( {
            isButton: type
        })
    };

    render() {
        const {isButton} = this.state;

        return(
            <Formik
                initialValues={{content: ''}}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    setSubmitting(true);
                    saveComments(this.props,values,setSubmitting);
                    this.isButton(false);
                    resetForm();
                }}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Row>
                            <StyledFormikField
                                type="text"
                                name="content"
                                placeholder="Write a comment..."
                                onInput={() => this.isButton(true)}
                            />

                            {isButton &&
                            <StyledSaveButton isWhite type="submit" disabled={isSubmitting}>
                                Save
                            </StyledSaveButton>
                            }
                        </Row>
                    </Form>
                )}
            </Formik>
        );
    }
}

export default CommentsForm;