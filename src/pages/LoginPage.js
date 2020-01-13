import React from "react";
import {HR, Img, P, StyledLink} from "../layout/theme";
import logo from "../logo.svg";
import LoginForm from "../components/LoginForm";
import LoginLayout from "../layout/LoginLayout";
import {Redirect} from "react-router";
import ReactNoticifaction from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

// const

const LoginPage = (props) => {
    return (
        <>
            {props.loggedIn ?
                <Redirect to="/dashboard"/>
                :
                <>
                    <ReactNoticifaction />
                <LoginLayout>
                    <Img src={logo} alt="Logo"/>
                    <P>
                        Log in to Task Manager
                    </P>
                    <LoginForm
                        handleLogin={props.handleLogin}
                    />

                    <HR />

                    <StyledLink to="/signUp"> Sign up for an account </StyledLink>
                    <StyledLink to="/recovery"> Forgot password ? </StyledLink>
                </LoginLayout>
                </>
            }
        </>
    )
};

export default LoginPage;