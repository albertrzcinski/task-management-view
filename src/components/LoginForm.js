import React from "react";
import {ErrorMessage, Form, Formik} from "formik";
import * as yup from 'yup';
import Button from "./Button";
import {FormikField} from '../layout/theme';
import styled from "styled-components";
import {withRouter} from "react-router-dom";
import {LoginContext} from "../App";

const FieldWrapper = styled.div`
  margin-top: 20px;
`;

const ButtonWrapper = styled(FieldWrapper)`
  margin-bottom: 20px;
`;

const StyledErrorMessage = styled(ErrorMessage)`
  color: ${({theme}) => theme.color.red};
  font-size: 0.8em;
  padding-left: 5px;
  margin-top: 2px;
`;

const validationSchema = yup.object().shape({
    username: yup.string()
        .min(1,"Must have a character")
        .max(50,"Must be shorter than 50")
        .required("Must enter a username"),
    password: yup.string()
        .min(6,"Must have a 6 character")
        .required("Must enter a password")
});

const validationSchemaWithEmail = yup.object().shape({
    username: yup.string()
        .min(5,"This field must be longer")
        .max(50,"This field must be shorter than 50")
        .required("This field is required"),
    password: yup.string()
        .min(6,"This field must have a 6 character")
        .required("This field is required"),
    email: yup.string()
        .email("That doesn't look like a valid email address")
        .required("This field is required")
});

const LoginForm = (props) => (
    <LoginContext.Consumer>
        {({handleLogin}) => (
             <Formik
                initialValues={{username: '', password: '', email: ''}}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    setSubmitting(true);
                    alert(`Email : ${values.email}
                             Username : ${values.username}
                             Password : ${values.password}`);
                    resetForm();
                    props.email ?
                        alert("signUP")
                        :
                        handleLogin(values.username);
                    props.history.push("/");
                    setSubmitting(false);
                }}
                validationSchema={
                    props.email ? validationSchemaWithEmail : validationSchema
                }
            >
                {({isSubmitting}) => (
                        <Form>
                            {props.email ?
                                <>
                                    <FormikField
                                        type="email"
                                        name="email"
                                        placeholder="Enter e-mail"
                                    />
                                    <StyledErrorMessage name='email' component='div'/>
                                </>
                                : null
                            }

                            <FieldWrapper>
                                <FormikField
                                    type="text"
                                    name="username"
                                    placeholder="Enter username"
                                />
                                <StyledErrorMessage name='username' component='div'/>
                            </FieldWrapper>

                            <FieldWrapper>
                                <FormikField
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                />
                                <StyledErrorMessage name='password' component='div'/>
                            </FieldWrapper>

                            <ButtonWrapper>
                                {props.email ?
                                    <Button
                                        isBlue
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        Sign up
                                    </Button>
                                    :
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        Log in
                                    </Button>
                                }
                            </ButtonWrapper>
                        </Form>
                )}
            </Formik>
        )}
    </LoginContext.Consumer>

);

export default withRouter(LoginForm);