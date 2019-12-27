import React, {Component} from "react";
import styled from "styled-components";
import posed from "react-pose";
import SideBarFooterWithRef from "../components/SideBarFooterWithRef";
import photo from "../utils/img.jpg";

const MenuWrapper = styled.nav`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background-color: ${({theme}) => theme.color.blue};
`;

const PosedSideBar = posed(MenuWrapper)({
    visible : {
        opacity: 1,
        x: 0,
        delayChildren: 100,
        staggerChildren: 40,
    },
    hidden: {
        opacity: 0,
        x: '-100%'
    }
});

const Photo = styled.div`
  border-radius: 50px;
  border: 1px solid ${({theme}) => theme.color.brighterBlue};
  background: url(${photo});
  background-size: contain;
  margin-top: 20px;
  width: 55px;
  height: 55px;
`;

const PosedPhoto = posed(Photo)({
   visible:{
       opacity: 1,
       y: 0
   },
    hidden:{
        opacity: 0,
        y: -20
    }

});

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UL = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  color: ${({theme}) => theme.color.brighterBlue};
  font-size: 1.4rem;
  margin: 1.5em 0 0 0;
  padding: 0;
  cursor: pointer;
`;

const LI = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  
  :hover {
    color: ${({theme}) => theme.color.midnightblue};
  }
`;


const PosedLI = posed(LI)({
    visible:{
        opacity: 1,
        y: 0
    },
    hidden:{
        opacity: 0,
        y: 20
    }
});

const Footer = posed(SideBarFooterWithRef)({
    visible:{
        opacity: 1,
        y: 0
    },
    hidden:{
        opacity: 0,
        y: 20
    }
});

class SideBar extends Component {
    state = {
        isOpen: false
    };

    componentDidMount() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        const {isOpen} = this.state;

        return (
          <PosedSideBar pose={isOpen ? 'visible' : 'hidden'}>
              <ListWrapper>

                  <PosedPhoto/>

                  <UL>
                      <PosedLI> All tasks </PosedLI>
                      <PosedLI>Today</PosedLI>
                      <PosedLI>Tomorrow</PosedLI>
                      <PosedLI>Go to date</PosedLI>
                      <PosedLI>Collections</PosedLI>
                      <PosedLI>Shared with Me</PosedLI>
                      <PosedLI>Tags</PosedLI>
                      <PosedLI>Complete</PosedLI>
                  </UL>

                  <Footer/>

              </ListWrapper>
          </PosedSideBar>
        );
    }
}

export default SideBar;