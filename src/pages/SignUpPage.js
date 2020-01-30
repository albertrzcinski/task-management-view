import React, {Component} from "react";
import {HR, Img, P, StyledFaStream, StyledLink} from "../layout/theme";
import LoginForm from "../components/LoginForm";
import LoginLayout from "../layout/LoginLayout";
import ReactNoticifaction from "react-notifications-component";

class SignUpPage extends Component {
    render() {
        return (
            <>
                <ReactNoticifaction />
                <LoginLayout>
                    <Img>
                        <StyledFaStream/>
                        Task Manager </Img>
                    <P>
                        Sign up to Task Manager
                    </P>
                    <LoginForm email/>
                    <HR />

                    <StyledLink to="/login"> Already have an account? Log in </StyledLink>
                </LoginLayout>
            </>
        )
    }
}

export default SignUpPage;
