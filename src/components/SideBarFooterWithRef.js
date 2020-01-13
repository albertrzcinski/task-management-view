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
  
    ${({theme}) => theme.media.tablet} {
        font-size: 1.8rem;
  }   
`;

const StyledMdSettings = styled(MdSettings)`
  ${sharedCss}
`;

const StyledMdExitToApp = styled(MdExitToApp)`
  margin-left: 135px;
  ${sharedCss}
  
  ${({theme}) => theme.media.tablet} {
        margin-left: 50px;
  }  
`;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 3em;
  
  ${({theme}) => theme.media.tablet} {
        padding-left: 40px;
        margin-top: 200px;
  }   
`;

const SideBarFooterWithRef = React.forwardRef((props, ref) => {
   return (
       <Wrapper {...props} ref={ref}>
           <StyledMdSettings onClick={() => props.menuClick("Settings")}/>
           <StyledMdExitToApp onClick={props.handleLogout}/>
       </Wrapper>
   )
});

export default SideBarFooterWithRef;
