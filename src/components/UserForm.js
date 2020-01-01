import React from "react";
import {ErrorMessage, Form, Formik, Field} from "formik";
import Button from "./Button";
import styled from "styled-components";
import PhotoField from "./PhotoField";
import * as yup from "yup";

const StyledField = styled(Field)`
  display: flex;
  flex-direction: column;
  width: 50vw;
  height: 32px;
  opacity: 60%;
  border: 2px solid ${({theme}) => theme.color.border};
  border-radius: 5px;
  padding-left: 12px;
  transition: opacity .3s ease-in-out, border-color .3s ease-in-out;
 
  :focus {
    opacity: 75%;
    border-color: ${({theme}) => theme.color.blue};
    outline: none;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledErrorMessage = styled(ErrorMessage)`
  color: ${({theme}) => theme.color.red};
  font-size: 0.8em;
  padding-left: 5px;
  margin-top: 2px;
`;

const validationSchema = yup.object().shape({
    email: yup.string()
        .email("That isn't valid email address")
        .required("This field is required"),
    photo: yup.string()
        .test(
            'is-data',
            'Invalid file extension',
            value => value ? !value.includes('data') : true,
        ),
    firstName: yup.string()
        .min(2, "This field is too short"),
    lastName: yup.string()
        .min(2, "This field is too short"),
});

const UserForm = (props) => {
        const {user, saveUser} = props;

        return (
            <>
                <Formik
                    initialValues={{
                        email: user.email ? user.email : '',
                        photo: user.photo ? user.photo : '',
                        firstName: user.firstName ? user.firstName : '',
                        lastName: user.lastName ? user.lastName : '',
                        timeZone: user.timeZone ? user.timeZone : '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values,{setSubmitting}) => {
                        setSubmitting(true);
                        saveUser(values, setSubmitting)
                    }}
                >
                    {({isSubmitting, setFieldValue}) => (
                        <Form>
                            <Row>
                                <label> E-mail </label>
                                <Column>
                                    <StyledField
                                        type="email"
                                        name="email"
                                        placeholder="Enter a e-mail"
                                    />
                                    <StyledErrorMessage name='email' component='span'/>
                                </Column>
                            </Row>


                            <Row>
                                <label> Photo </label>
                                <Column>
                                    <StyledField
                                        component={PhotoField}
                                        name="photo"
                                        type="text"
                                        setFieldValue={setFieldValue}
                                    />
                                    <StyledErrorMessage name='photo' component='span'/>
                                </Column>
                            </Row>

                            <Row>
                                <label> First name </label>
                                <Column>
                                    <StyledField
                                        type="text"
                                        name="firstName"
                                        placeholder="Enter a first name"
                                    />
                                    <StyledErrorMessage name='firstName' component='span'/>
                                </Column>
                            </Row>

                            <Row>
                                <label> Last name </label>
                                <Column>
                                    <StyledField
                                        type="text"
                                        name="lastName"
                                        placeholder="Enter a last name"
                                    />
                                    <StyledErrorMessage name='lastName' component='span'/>
                                </Column>
                            </Row>

                            {/*<ButtonWrapper>*/}
                                <Button
                                    isWhite
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    Save changes
                                </Button>
                            {/*</ButtonWrapper>*/}
                        </Form>
                    )}
                </Formik>
            </>
        );
};

export default UserForm;