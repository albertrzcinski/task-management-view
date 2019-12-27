import styled from "styled-components";
import {Field} from "formik";
import {Link} from "react-router-dom";

export const theme = {
    color: {
        green: 'rgba(48,167,26,0.91)',
        blue: '#6684EC',
        brighterBlue: '#b7d4ff',//'#86a8e4',
        lightblue: '#93B5EF',//'#86a8e4',
        background: '#F7FAFF',//'#211a0f'
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
        desktop: '@media (min-width: 1024px)',
        tablet: '@media (min-width: 728px)'
    }
};

export const FormikField = styled(Field)`
  display: flex;
  flex-direction: column;
  width: 75vw;
  height: 40px;
  opacity: 60%;
  border: 2px solid ${({theme}) => theme.color.border};
  border-radius: 5px;
  padding-left: 20px;
  transition: opacity .3s ease-in-out, border-color .3s ease-in-out;
 
  :focus {
    opacity: 75%;
    border-color: ${({theme}) => theme.color.blue};;
  }
`;

export const Img = styled.img`
  margin-top: 4em;
  width: 30%;
`;

export const HR = styled.hr`
  width: 75vw;
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
