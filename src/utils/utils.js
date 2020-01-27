import axios from "axios";
import {store} from 'react-notifications-component';

const URL = `http://localhost:8080/`;

export const LOGIN_URL = URL+`login`;
export const SIGN_UP_URL = URL+`users/create`;

export const CHANGE_EMAIL_PASS = URL+`pass/changePass`;
export const RESET_PASS = URL+`pass/reset`;

export const CURRENT_USER_URL = URL+`users/me`;
export const ALL_USERS = URL+`users/all`;

export const TASKS_BY_OWNER_URL = URL+`tasks/allByOwner`;
export const TASKS_BY_MEMBER_URL = URL+`tasks/allByMember`;

export const SAVE_TASK = URL+`tasks/save`;
export const COMPLETE_TASK = URL+`tasks/complete`;
export const DELETE_TASK = URL+`tasks/delete`;

export const SAVE_USER = URL+`users/save`;
export const CHANGE_USER_PASS = URL+`users/changePass`;

export const USER_COLLECTIONS = URL+`sets/byUser`;
export const SAVE_COLLECTION = URL+`sets/save`;
export const DELETE_COLLECTION = URL+`sets/delete`;

export const USER_TAGS = URL+`tags/byUser`;
export const SAVE_TAG = URL+`tags/save`;
export const DELETE_TAG = URL+`tags/delete`;

export const CHANGE_COLLECTION = URL+`tasks/changeCollection`;
export const ADD_TAG_TO_TASK = URL+`tasks/addTag`;
export const REMOVE_TAG_FROM_TASK = URL+`tasks/removeTag`;
export const CHANGE_DESCRIPTION = URL+`tasks/changeDescription`;
export const CHANGE_TITLE = URL+`tasks/changeTitle`;
export const CHANGE_DATE = URL+`tasks/changeDueDate`;
export const MEMBER_ADD_TO_TASK = URL+`tasks/addMember`;
export const MEMBER_REMOVE_FROM_TASK = URL+`tasks/removeMember`;
export const COMMENTS_BY_TASK = URL+`comments/byTask`;
export const SAVE_COMMENTS = URL+`comments/save`;
export const DELETE_COMMENTS = URL+`comments/delete`;

export const ADD_DEPENDENT_TASK = URL+`tasks/addDependentTask`;
export const DELETE_DEPENDENT_TASKS = URL+`tasks/deleteDependentTasks`;

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

                if(res.data.includes("Email")) {
                    displayNotification(res.data, "warning");
                    setSubmitting(false);
                }
                else if(res.data.includes("Username")) {
                    displayNotification(res.data, "warning");
                    setSubmitting(false);

                } else if(res.data.includes("Done")) {
                    displayNotification("Account successfully created.", "success");
                    resetForm();
                    setTimeout(() => {
                        setSubmitting(false);
                        props.history.push("/")
                    }, 2000);
                }
            }
        })
        .catch(err => {
            if(!err.response) {
                displayNotification("Server is not responding. Try again later.", "danger");
                setSubmitting(false);
            }
        });
};
