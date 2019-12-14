import React from "react";
import {ErrorMessage, Form, Formik} from 'formik';
import * as yup from 'yup';
import {FormikField, HR, Img, P, StyledLink} from "../layout/theme";
import Button from "../components/Button";
import LoginLayout from "../layout/LoginLayout";
import logo from "../logo.svg";
import styled from "styled-components";
import axios from "axios";
import {displayNotification} from "../utils/utils";
import ReactNoticifaction from "react-notifications-component";

const ButtonWrapper = styled.div`
  margin-top: 20px;
`;

const StyledErrorMessage = styled(ErrorMessage)`
  color: ${({theme}) => theme.color.red};
  font-size: 0.8em;
  padding-left: 5px;
`;

const validationSchema = yup.object().shape({
    email: yup.string()
        .email("That doesn't look like a valid email address")
        .required("This field is required")
});

const sendLink = (value, setSubmitting, resetForm) => {
    //TODO change this post to right
    axios.post('some url to recovery', {
        email: value.email
    })
        .then(res => {
            if(res.status === 200) {
                displayNotification("Recovery link was sent. Check your email inbox.", "success");
                resetForm();
                setSubmitting(false);
            }
        })
        .catch(err => {
            if(!err.response) {
                displayNotification("Server is not responding. Try again later.", "danger");
                setSubmitting(false);
            } else {
                displayNotification("Account with this email address doesn't exist.", "warning");
                setSubmitting(false);
            }
        });
};

const RecoveryPage = () => (
    <>
    <ReactNoticifaction />
    <LoginLayout>
        <Img src={logo} alt="Logo"/>

        <P>
            Forgot password ?
        </P>
        <p>
            We'll send a recovery link to
        </p>

        <Formik
            initialValues={{email: ''}}
            validationSchema={validationSchema}
            onSubmit={(values, {setSubmitting, resetForm}) => {
                setSubmitting(true);
                sendLink(values, setSubmitting, resetForm);
            }}
        >
            {({isSubmitting}) => (
                <Form>
                    <FormikField
                        type="email"
                        name="email"
                        placeholder="Enter e-mail "
                    />
                    <StyledErrorMessage name="email" component="div" />

                    <ButtonWrapper/>
                        <Button type="submit" disabled={isSubmitting}>
                            Send recovery link
                        </Button>
                    <ButtonWrapper/>
                </Form>
            )}
        </Formik>

        <HR/>

        <StyledLink to="/login">Return to log in</StyledLink>
    </LoginLayout>
    </>
);

export default RecoveryPage;