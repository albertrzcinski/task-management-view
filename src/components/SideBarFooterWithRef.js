import React from "react";
import styled, {css} from "styled-components";
import {MdSettings, MdExitToApp} from "react-icons/md";

const sharedCss = css`
  font-size: 2rem;
  color: ${({theme}) => theme.color.brighterBlue};
  cursor: pointer;
  
  :hover {
    color: ${({theme}) => theme.color.midnightblue};
  }
`;

const StyledMdSettings = styled(MdSettings)`
  ${sharedCss}
`;

const StyledMdExitToApp = styled(MdExitToApp)`
  ${sharedCss}
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60vw;
  margin-top: 3em;
`;

const SideBarFooterWithRef = React.forwardRef((props, ref) => {
   return (
       <Wrapper {...props} ref={ref}>
           <StyledMdSettings/>
           <StyledMdExitToApp onClick={props.handleLogout}/>
       </Wrapper>
   )
});

export default SideBarFooterWithRef;
