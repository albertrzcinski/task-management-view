import React from "react";
import axios from "axios";
import {CHANGE_USER_PASS, displayNotification, SAVE_USER} from "../utils/utils";
import UserForm from "../components/UserForm";
import PasswordForm from "../components/PasswordForm";
import styled from "styled-components";

const AccountWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 80%;
 
  ${({theme}) => theme.media.tablet} {
    align-items: flex-start;
    padding-left: 50px;
    width: 60%;
  }
`;

const H3 = styled.h3`
  margin-top: 8px;
  
  ${({theme}) => theme.media.tablet} {
    margin-top: 12px;
  }
  
`;

const Account = (props) => {
    const {user, handleLogout} = props;

    const saveUser = async (values, setSubmitting) => {
       await axios
            .post(SAVE_USER,
                {
                    "id": user.id,
                    "email": values.email,
                    "photo": values.photo,
                    "firstName": values.firstName,
                    "lastName": values.lastName,
                },
                {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": localStorage.getItem('token')
                    }
                })
            .then(() => {
                displayNotification("Account successfully updated.", "success");
                setSubmitting(false);
                props.handleGetUser();
            })
            .catch(handleLogout);
    };


    const changePassword = (values, setSubmitting) => {
        axios
            .post(CHANGE_USER_PASS,
                {
                    "id": user.id,
                    "oldPass": values.currentPass,
                    "newPass": values.newPass
                },
                {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": localStorage.getItem('token')
                    }
                })
            .then(res => {
                if(res.data.includes("updated")) {
                    displayNotification(res.data, "success");
                }
                else if(res.data.includes("invalid")) {
                    displayNotification(res.data, "warning");
                }
                setSubmitting(false);
            })
            .catch(err => console.log(err))
    };

  return (
    <AccountWrapper>
        <h3>Account</h3>

        <UserForm
            user={user}
            saveUser={saveUser}
        />

        <H3>Password</H3>

        <PasswordForm
            changePassword={changePassword}
        />
    </AccountWrapper>
  );
};

export default Account;