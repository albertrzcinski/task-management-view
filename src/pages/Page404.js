import React from "react";
import styled, {createGlobalStyle, ThemeProvider} from "styled-components";
import Button from "../components/Button";
import {theme} from "../layout/theme";
import {Route} from "react-router";

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: "Lato", sans-serif;
    color: ${({theme}) => theme.color.text};
    background-color: ${({theme}) => theme.color.background};
}

*, *::before, *::after {
    box-sizing: border-box;
}
`;

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  text-align: center;
`;

const P = styled.p`
  font-size: 5em;
  font-weight: 800;
  margin: 0;
  padding-top: 80px;
  color: ${({theme}) => theme.color.blue}
`;

const H3 = styled.h3`
  margin-top: 0;
`;

const StyledButton = styled(Button)`
  max-width: 300px;
`;

const Page404 = () => (
    <Route render={({history}) => (
        <Wrapper>
            <ThemeProvider theme={theme}>
                <GlobalStyle/>
                <P>404</P>
                <H3>Page not found</H3>
                <p>The page you are looking for does not exist.</p>

                <StyledButton onClick={() => {
                    history.push("/")
                }}>
                    Go home
                </StyledButton>
            </ThemeProvider>
        </Wrapper>
    )}/>
);

export default Page404;