import React, {Component} from "react";
import {HR, Img, P, StyledLink} from "../layout/theme";
import logo from "../logo.svg";
import LoginForm from "../components/LoginForm";
import LoginLayout from "../layout/LoginLayout";

class SignUpPage extends Component {
    render() {
        return (
            <>
                <LoginLayout>
                    <Img src={logo} alt="Logo"/>
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