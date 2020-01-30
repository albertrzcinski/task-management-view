import styled from "styled-components";
import {Field} from "formik";
import {Link} from "react-router-dom";
import {FaStream} from "react-icons/fa"

export const theme = {
    color: {
        green: 'rgba(48,167,26,0.91)',
        blue: '#6684EC',
        brighterBlue: '#b7d4ff',
        lightblue: '#93B5EF',
        background: '#F7FAFF',
        white: "#fdfdfd",
        text: '#7D7D7D',
        border: "#b3b3b3",
        red: "#8d1e1b",
        pink: "#ffe3f1",
        darkPink: "#f3a2cd",
        search: "rgba(168, 190, 255, 0.4)",
        midnightblue: 'midnightblue'
    },
    media: {
        desktop: '@media (min-width: 1025px)',
        tablet: '@media (min-width: 769px)'
    }
};

export const FormikField = styled(Field)`
  width: 100%;
  height: 40px;
  opacity: 60%;
  border: 2px solid ${({theme}) => theme.color.border};
  border-radius: 5px;
  padding-left: 20px;
  transition: opacity .3s ease-in-out, border-color .3s ease-in-out;
 
  :focus {
    opacity: 75%;
    border-color: ${({theme}) => theme.color.blue};;
    outline: none;
  }
`;

export const StyledFaStream = styled(FaStream)`
  color: #029ed9;
  margin-right: 10px;
  text-shadow: 0 3px 3px rgba(255,255,255,0.5);
`;

export const Img = styled.h1`
  font-family: "Myanmar Text",serif;
  margin-top: 2em;
  color: transparent;
  background: #0274a8;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  text-shadow: 0px 3px 3px rgba(255,255,255,0.5);
`;

export const HR = styled.hr`
  width: 75%;
  margin-bottom: 25px;
  opacity: 50%;
`;

export const StyledLink = styled(Link)`
  color: ${({theme}) => theme.color.blue};
  text-decoration: none;
  margin-bottom: 15px;
  font-size: 0.9em;
`;

export const P = styled.p`
  font-weight: 600;
`;
