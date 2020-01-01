import React from "react";
import {ErrorMessage, Form, Formik, Field} from "formik";
import styled from "styled-components";
import Button from "./Button";
import * as yup from "yup";

const StyledField = styled(Field)`
  display: flex;
  flex-direction: column;
  width: 75vw;
  height: 32px;
  margin-bottom: 15px;
  opacity: 60%;
  border: 2px solid ${({theme}) => theme.color.border};
  border-radius: 5px;
  text-align: center;
  transition: opacity .3s ease-in-out, border-color .3s ease-in-out;
  
  :focus {
    opacity: 75%;
    border-color: ${({theme}) => theme.color.blue};
    outline: none;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const validationSchema = yup.object().shape({
    currentPass: yup.string()
        .min(6,"This field must have a 6 character")
        .required("This field is required"),
    newPass: yup.string()
        .min(6,"This field must have a 6 character")
        .required("This field is required"),
    verifyPass: yup.string()
        .min(6,"This field must have a 6 character")
        .required("This field is required")
        .oneOf([yup.ref('newPass'), null],"Passwords don't match")
});

const StyledErrorMessage = styled(ErrorMessage)`
  color: ${({theme}) => theme.color.red};
  font-size: 0.8em;
  margin-top: -13px;
  margin-bottom: 3px;
`;

const PasswordForm = (props) => {
    const {changePassword} = props;

  return (
    <>
        <Formik initialValues={{
            currentPass: '',
            newPass: '',
            verifyPass: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting, resetForm}) => {
            setSubmitting(true);
            changePassword(values, setSubmitting);
            resetForm();
        }}
        >
            {({isSubmitting}) => (
                <StyledForm>
                    <StyledField
                        type="password"
                        name="currentPass"
                        placeholder="Current password"
                    />
                    <StyledErrorMessage name='currentPass' component='span'/>

                    <StyledField
                        type="password"
                        name="newPass"
                        placeholder="New password"
                    />
                    <StyledErrorMessage name='newPass' component='span'/>

                    <StyledField
                        type="password"
                        name="verifyPass"
                        placeholder="Verify password"
                    />
                    <StyledErrorMessage name='verifyPass' component='span'/>

                        <Button
                            isWhite
                            type="submit"
                            disabled={isSubmitting}
                        >
                            Save changes
                        </Button>
                </StyledForm>
            )}
        </Formik>
    </>
  );
};

export default PasswordForm;