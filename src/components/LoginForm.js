import React from "react";
import {ErrorMessage, Form, Formik} from "formik";
import * as yup from 'yup';
import Button from "./Button";
import {FormikField} from '../layout/theme';
import styled from "styled-components";
import {withRouter} from "react-router";
import {createUser,} from "../utils/utils";

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
        .min(5,"This field must be longer")
        .max(50,"This field must be shorter than 50")
        .required("This field is required"),
    password: yup.string()
        .min(6,"This field must have a 6 character")
        .required("This field is required")
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
    <Formik
        initialValues={{username: '', password: '', email: ''}}
        onSubmit={(values, {setSubmitting, resetForm}) => {
            setSubmitting(true);
            if(props.email) {
                createUser(values, props, setSubmitting, resetForm);
            }
            else {
                props.handleLogin(values, setSubmitting);
            }
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
);

export default withRouter(LoginForm);