import React, {Component} from "react";
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
  
  :focus{
    outline: none;
  }
`;

const StyledMdAddCircle = styled(MdAddCircle)`
  height: 2.6em;
  width: 2.6em;
  color: #b0caff;
  cursor: pointer;
`;

class NavBar extends Component {
    childToggle = () =>{
        this.child.toggle();
    };

    render() {
        return (
            <NavBarWrapper>
                <div onClick={this.props.displaySideBar}>
                    <HamburgerMenu ref={instance => {this.child = instance}}/>
                </div>

                <SearchBar search={this.props.search} />

                <CircleButton>
                    <StyledMdAddCircle/>
                </CircleButton>

                {/*<h2>*/}
                {/*    Hello {localStorage.getItem('username')}*/}
                {/*</h2>*/}
            </NavBarWrapper>
        );
    }
};

export default NavBar;