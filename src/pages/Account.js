import React from "react";
import axios from "axios";
import {CHANGE_USER_PASS, displayNotification, SAVE_USER} from "../utils/utils";
import UserForm from "../components/UserForm";
import CloseMark from "../components/CloseMark";
import PasswordForm from "../components/PasswordForm";

const Account = (props) => {
    const {user, closeAccount, handleLogout} = props;

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
    <>
        <CloseMark onClick={closeAccount}/>

        <h3>Account</h3>

        <UserForm
            user={user}
            saveUser={saveUser}
        />

        <h3>Password</h3>

        <PasswordForm
            changePassword={changePassword}
        />
    </>
  );
};

export default Account;