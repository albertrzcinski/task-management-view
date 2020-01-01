import styled, {css} from "styled-components";

const Button = styled.button`
  width: 75vw;
  height: 40px;
  border: none;
  border-radius: 5px;
  background: ${({theme}) => theme.color.green};
  font-size: 1em;
  font-weight: 600;
  color: ${({theme}) => theme.color.white};
  box-shadow: 3px 10px 15px -10px ${({theme}) => theme.color.text};
  opacity: 90%;
  
   ${({isBlue}) =>
    isBlue && 
    css`
      background: ${({theme}) => theme.color.blue};
    `};
   
    ${({isWhite}) =>
    isWhite &&
    css`
      opacity: 75%;
      background: ${({theme}) => theme.color.white};
      color: ${({theme}) => theme.color.blue};
      box-shadow: 3px 6px 15px -10px ${({theme}) => theme.color.text};
      border: 1.5px solid ${({theme}) => theme.color.blue};
      transition: opacity .2s ease-in-out, border-color .2s ease-in-out;
      
      :hover, :focus {
        opacity: 85%;
      }
    `};
   
   :hover, :focus  {
    opacity: 100%;
    outline: none;
   }
`;

export default Button;