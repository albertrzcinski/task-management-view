import React from "react";
import styled from "styled-components";
import {ErrorMessage, Form, Formik} from "formik";
import {FormikField} from "../layout/theme";
import * as yup from "yup";
import Button from "./Button";
import axios from "axios";
import {displayNotification, SAVE_COLLECTION, SAVE_TAG} from "../utils/utils";

const StyledForm = styled(Form)`
  margin: 10px 0 10px 0;
`;

const Row = styled.div`
  margin: 0 15px 0 15px;
  padding: 0 5px 0 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${({theme}) => theme.color.border};
  opacity: 90%;
  transition: opacity .3s ease-in-out, border-color .3s ease-in-out;
  pointer-events: all;
`;

const StyledFormikField = styled(FormikField)`
  padding: 0 20px 0 0;
  font-size: 1.1em;
  font-weight: 500;
  width: auto;
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

const StyledErrorMessage = styled(ErrorMessage)`
  color: ${({theme}) => theme.color.red};
  font-size: 0.8em;
  padding-left: 35px;
  margin: 2px 0 15px 0;
`;

const validationSchema = yup.object().shape({
    name: yup.string()
        .min(2, "Too short")
        .required("This field is required")
});

const saveCollectionTags = (props, values, setSubmitting) => {
    axios
        .post(props.menuOption === "Collections" ? SAVE_COLLECTION : SAVE_TAG,
            {
                "id": props.id,
                "name": values.name,
                "owner": {
                    "id":  props.userId
                },
                "user": {
                    "id": props.userId
                }
            },{
                headers: {
                    "Content-type": "application/json",
                    "Authorization": localStorage.getItem('token')
                }
            })
        .then(() => {
            displayNotification("Successfully updated.", "success");
            setSubmitting(false);
            props.getData(props.menuOption);
            props.toggleIsRename();
        })
        .catch(err => { console.log(err);
            props.handleLogout();
        });

};

const RenameForm = (props) => {
    return(
        <Formik
            initialValues={{name: props.title}}
            validationSchema={validationSchema}
            onSubmit={(values, {setSubmitting}) => {
                setSubmitting(true);
                saveCollectionTags(props,values,setSubmitting);
            }}
        >
            {({isSubmitting}) => (
                <StyledForm>
                    <Row>
                        <StyledFormikField
                            type="text"
                            name="name"
                        />

                        <StyledSaveButton isWhite type="submit" disabled={isSubmitting}>
                            Save
                        </StyledSaveButton>
                    </Row>
                    <StyledErrorMessage name="name" component="div"/>
                </StyledForm>
            )}
        </Formik>
    );
};

export default RenameForm;