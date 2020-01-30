import React from "react";
import {HR, Img, P, StyledFaStream, StyledLink} from "../layout/theme";
import LoginForm from "../components/LoginForm";
import LoginLayout from "../layout/LoginLayout";
import {Redirect} from "react-router";
import ReactNoticifaction from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

const LoginPage = (props) => {
    return (
        <>
            {props.loggedIn ?
                <Redirect to="/dashboard"/>
                :
                <>
                    <ReactNoticifaction />
                <LoginLayout>
                    <Img>
                        <StyledFaStream/>
                        Task Manager
                    </Img>
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
