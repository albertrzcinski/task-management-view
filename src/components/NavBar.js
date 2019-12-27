import React from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import {MdAddCircle} from "react-icons/md"
import HamburgerMenu from "./HamburgerMenu";

const NavBarWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    margin: 0 20px 0 20px;
    color: ${({theme}) => theme.color.background};
`;

const CircleButton = styled.button`
  background: none;
  border: none;
  padding: 3px;
`;

const StyledMdAddCircle = styled(MdAddCircle)`
  height: 2.6em;
  width: 2.6em;
  color: #b0caff;
  cursor:pointer;
`;

const NavBar = (props) => {
    // render() {
        return (
            <NavBarWrapper>
                <div onClick={props.displaySideBar}>
                    <HamburgerMenu />
                </div>

                <SearchBar/>

                <CircleButton>
                    <StyledMdAddCircle/>
                </CircleButton>

                {/*<h2>*/}
                {/*    Hello {localStorage.getItem('username')}*/}
                {/*</h2>*/}
            </NavBarWrapper>
        );
    // }
};

export default NavBar;