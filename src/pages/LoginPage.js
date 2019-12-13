import React, {Component} from "react";
import {HR, Img, P, StyledLink} from "../layout/theme";
import logo from "../logo.svg";
import LoginForm from "../components/LoginForm";
import LoginLayout from "../layout/LoginLayout";
import {LoginContext} from "../App";
import {Redirect} from "react-router-dom";

class LoginPage extends Component {
    render() {
        const {Consumer} = LoginContext;
        return (
            <>
                <Consumer>
                    {({loggedIn}) => (
                        loggedIn ?
                            <Redirect to="/dashboard"/>
                            :
                            <LoginLayout>
                                <Img src={logo} alt="Logo"/>
                                <P>
                                    Log in to Task Manager
                                </P>
                                <LoginForm
                                    //handleLogin={this.props.handleLogin}
                                />

                                <HR />

                                <StyledLink to="/signUp"> Sign up for an account </StyledLink>
                                <StyledLink to="/recovery"> Forgot password ? </StyledLink>
                            </LoginLayout>
                    )}
                </Consumer>
            </>
        )
    }
}

export default LoginPage;