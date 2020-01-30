import React, {Component} from "react";
import styled from "styled-components";
import SideBarFooterWithRef from "../components/SideBarFooterWithRef";

const MenuWrapper = styled.nav`
  width: 220px;
  background-color: ${({theme}) => theme.color.blue};
  display: none;
  margin-left: 20px;
      
  ${({theme}) => theme.media.tablet} {
        display: block;
  }   
`;

const UL = styled.ul`
  list-style: none;
  color: ${({theme}) => theme.color.brighterBlue};
  font-size: 1.1em;
  margin: 0 0 0 0;
  cursor: pointer;
  padding-left: 0;
`;

const LI = styled.li`
  margin-bottom: 10px;
  padding: 10px 0 10px 30px;
  
  :hover {
    color: ${({theme}) => theme.color.midnightblue};
    background-color: ${({theme}) => theme.color.brighterBlue};
  }
  
  :first-child {
    margin-top: 20px;
  }
`;

class SideBarD extends Component {
    render() {
        const {click, handleLogout, displayAccount} = this.props;

        return (
            <MenuWrapper>
                    <UL>
                        <LI onClick={() => {
                            click("All task");
                        }}>
                            All tasks
                        </LI>

                        <LI onClick={() => {
                            click("Today");
                        }}>
                            Today
                        </LI>

                        <LI onClick={() => {
                            click("Tomorrow");
                        }}>
                            Tomorrow
                        </LI>

                        <LI onClick={() => {
                            click("Collections");
                        }}>
                            Collections
                        </LI>

                        <LI onClick={() => {
                            click("Shared");
                        }}>
                            Shared with Me
                        </LI>

                        <LI onClick={() => {
                            click("Tags");
                        }}>
                            Tags
                        </LI>

                        <LI onClick={() => {
                            click("Dependent tasks");
                        }}>
                            Dependent tasks
                        </LI>

                        <LI onClick={() => {
                            click("Completed");
                        }}>
                            Completed
                        </LI>
                    </UL>

                    <SideBarFooterWithRef
                        handleLogout={handleLogout}
                        displayAccount={displayAccount}
                        menuClick={click}
                    />
            </MenuWrapper>
        );
    }
}

export default SideBarD;
