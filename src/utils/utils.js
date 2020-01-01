import axios from "axios";
import {store} from 'react-notifications-component';

const URL = `http://localhost:8080/`;
export const LOGIN_URL = URL+`login`;
export const SIGN_UP_URL = URL+`users/create`;
export const CURRENT_USER_URL = URL+`users/me`;
export const TASKS_BY_OWNER_URL = URL+`tasks/allByOwner`;
export const TASKS_BY_MEMBER_URL = URL+`tasks/allByMember`;
export const SAVE_TASK = URL+`tasks/save`;
export const COMPLETE_TASK = URL+`tasks/complete`;
export const DELETE_TASK = URL+`tasks/delete`;
export const SAVE_USER = URL+`users/save`;
export const CHANGE_USER_PASS = URL+`users/changePass`;

// export const ALL_USERS_URL = URL+`users/all`;

export const displayNotification = (message, type) => {
    store.addNotification({
        message: message,
        type: type,
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
            duration: 5000
        }
    });
};


export const createUser = (values, props, setSubmitting, resetForm) => {
    axios.post(SIGN_UP_URL,{
        email: values.email,
        username: values.username,
        password: values.password
    })
        .then(res => {
            if(res.status === 200) {
                displayNotification("Account successfully created.", "success");
                resetForm();
                setTimeout(() => {
                    setSubmitting(false);
                    props.history.push("/")
                },2000);

            }
        })
        .catch(err => {
            if(!err.response) {
                displayNotification("Server is not responding. Try again later.", "danger");
                setSubmitting(false);
            }
        });
};
