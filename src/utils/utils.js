import axios from "axios";
import {store} from "react-notifications-component";

const url = `http://localhost:8080/`;
export const loginUrl = url+`login`;
export const signUpUrl = url+`users/create`;
export const me = `chyba nie trzeba`;

export const userAll = url+`users/all`;

export const displayNotification = (message, type) => {
    store.addNotification({
        message: message,
        type: type,
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
            duration: 7000
        }
    });
};


export const createUser = (values, props, setSubmitting, resetForm) => {
    axios.post(signUpUrl,{
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
                },3000);

            }
        })
        .catch(err => {
            if(!err.response) {
                displayNotification("Server is not responding. Try again later.", "danger");
                setSubmitting(false);
            }
        });
};
