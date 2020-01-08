import React from "react";
import styled, {css} from "styled-components";

const Close = styled.button`
  position: absolute;
  left: 20px;
  margin-top: 15px;
  background: none;
  border: none;
  padding: 15px;
  cursor: pointer;
  
  :focus{
    outline: none;
  }
  
  ${props => props.due &&
    css`
      margin-left: 5px;
      left: unset;
      margin-top: unset;
    `}
`;

const sharedCss = css`
  position: absolute;
  width: 25px;
  height: 2px;
  background-color: ${({theme}) => theme.color.brighterBlue};
  left: 0;
`;

const Line = styled.div`
  ${sharedCss};
  transform: rotate(45deg);
  
  ::after{
    ${sharedCss};
    content: '';
    transform: rotate(90deg);
  }
`;

const CloseMark = (props) => {
  return (
      <Close onClick={props.onClick} due={props.due}>
          <Line/>
      </Close>
  );
};

export default CloseMark;