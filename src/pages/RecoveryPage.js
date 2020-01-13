import React from "react";
import {ErrorMessage, Form, Formik} from 'formik';
import * as yup from 'yup';
import {FormikField, HR, Img, P, StyledLink} from "../layout/theme";
import Button from "../components/Button";
import LoginLayout from "../layout/LoginLayout";
import logo from "../logo.svg";
import styled from "styled-components";
import axios from "axios";
import {CHANGE_EMAIL_PASS, CHANGE_USER_PASS, displayNotification, RESET_PASS} from "../utils/utils";
import ReactNoticifaction from "react-notifications-component";

const ButtonWrapper = styled.div`
  margin-top: 20px;
`;

const StyledErrorMessage = styled(ErrorMessage)`
  color: ${({theme}) => theme.color.red};
  font-size: 0.8em;
  padding-left: 5px;
`;

const StyledForm = styled(Form)`
  width: 70%;
`;

const validationSchema = yup.object().shape({
    email: yup.string()
        .email("That doesn't look like a valid email address")
        .required("This field is required")
});

const resetValidationSchema = yup.object().shape({
    newPass: yup.string()
        .min(6,"This field must have a 6 character")
        .required("This field is required"),
    verifyPass: yup.string()
        .min(6,"This field must have a 6 character")
        .required("This field is required")
        .oneOf([yup.ref('newPass'), null],"Passwords don't match")
});

const sendLink = (value, setSubmitting, resetForm) => {
    axios.post(RESET_PASS, {
        "email": value.email
    })
        .then(res => {
            if(res.status === 200) {
                displayNotification("Recovery link was sent. Check your email inbox.", "success");
                resetForm();
                setSubmitting(false);
            }
            if(res.data.includes("Not")) {
                displayNotification("Account with this email address doesn't exist.", "warning");
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

const changePasswordByEmail = (email, token, values, setSubmitting) => {
    axios
        .post(CHANGE_EMAIL_PASS,
            {
                "email": email,
                "oldPass": values.currentPass,
                "newPass": values.newPass
            },
            {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": token
                }
            })
        .then(res => {
            if(res.data.includes("updated")) {
                displayNotification(res.data, "success");
            }
            else if(res.data.includes("exist")) {
                displayNotification(res.data, "warning");
            }
            setSubmitting(false);
        })
        .catch(err => console.log(err))
};

const RecoveryPage = (props) => {
    const url = new URL(window.location.href);
    const email = url.searchParams.get("e");
    let token = url.searchParams.get("t");

    if(email !== null && token !== null){
        token = `Bearer ${token}`;
        return (
            <>
                <LoginLayout>
                    <Img src={logo} alt="Logo"/>

                    <P>
                        Reset your password
                    </P>

                    <ButtonWrapper/>
                    <Formik
                        initialValues={{
                            newPass: '',
                            verifyPass: ''
                        }}
                        validationSchema={resetValidationSchema}
                        onSubmit={(values, {setSubmitting, resetForm}) => {
                            setSubmitting(true);
                            changePasswordByEmail(email, token, values, setSubmitting);
                            resetForm();
                            setTimeout(() => {
                                props.history.push("/")
                            }, 2000);
                        }}
                    >
                        {({isSubmitting}) => (
                            <StyledForm>
                                <FormikField
                                    type="password"
                                    name="newPass"
                                    placeholder="New password"
                                />
                                <StyledErrorMessage name="newPass" component="div"/>

                                <ButtonWrapper/>
                                <FormikField
                                    type="password"
                                    name="verifyPass"
                                    placeholder="Verify password"
                                />
                                <StyledErrorMessage name="verifyPass" component="div"/>

                                <ButtonWrapper/>
                                <Button type="submit" disabled={isSubmitting}>
                                    Save changes
                                </Button>
                                <ButtonWrapper/>
                            </StyledForm>
                        )}
                    </Formik>
                </LoginLayout>
            </>
        )
    }
    else {
        return (
            <>
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
                        <StyledForm>
                            <FormikField
                                type="email"
                                name="email"
                                placeholder="Enter e-mail "
                            />
                            <StyledErrorMessage name="email" component="div"/>

                            <ButtonWrapper/>
                            <Button type="submit" disabled={isSubmitting}>
                                Send recovery link
                            </Button>
                            <ButtonWrapper/>
                        </StyledForm>
                    )}
                </Formik>

                <HR/>

                <StyledLink to="/login">Return to log in</StyledLink>
            </LoginLayout>
            </>
        )
    }
};

export default RecoveryPage;