import React, {Component} from "react";
import styled, {css} from "styled-components";
import posed from "react-pose";
import SideBarFooterWithRef from "../components/SideBarFooterWithRef";

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

const Photo = styled.img`
  border-radius: 50px;
  border: 1px solid ${({theme}) => theme.color.brighterBlue};
  background-size: contain;
  margin: 20px 0 1.5em 0;
  width: 55px;
  height: 55px;
  
  ${({blank}) =>
    blank &&
    css`
       border: none;
       margin-bottom: 0;
    `};
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
  margin: 0 0 0 0;
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
        const {click, displaySideBar, handleLogout, displayAccount, photo} = this.props;
        const photoSrc = photo ? `data:image/*.*;base64,${photo}` : 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D';

        return (
          <PosedSideBar pose={isOpen ? 'visible' : 'hidden'}>
              <ListWrapper>

                  {photo ?
                      <PosedPhoto src={photoSrc}/>
                      :
                      <PosedPhoto src={photoSrc} blank/>
                  }

                  <UL>
                      <PosedLI onClick={() => {
                          click("All task");
                          displaySideBar();
                      }}>
                          All tasks
                      </PosedLI>

                      <PosedLI onClick={() => {
                          click("Today");
                          displaySideBar();
                      }}>
                          Today
                      </PosedLI>

                      <PosedLI onClick={() => {
                          click("Tomorrow");
                          displaySideBar();
                      }}>
                          Tomorrow
                      </PosedLI>

                      <PosedLI onClick={() => {
                          click("Collections");
                          displaySideBar();
                      }}>
                         Collections
                      </PosedLI>

                      <PosedLI onClick={() => {
                          click("Shared");
                          displaySideBar();
                      }}>
                          Shared with Me
                      </PosedLI>

                      <PosedLI onClick={() => {
                          click("Tags");
                          displaySideBar();
                      }}>
                          Tags
                      </PosedLI>

                      <PosedLI onClick={() => {
                          click("Dependent tasks");
                          displaySideBar();
                      }}>
                          Dependent tasks
                      </PosedLI>

                      <PosedLI onClick={() => {
                          click("Complete");
                          displaySideBar();
                      }}>
                          Complete
                      </PosedLI>
                  </UL>

                  <Footer
                      handleLogout={handleLogout}
                      displayAccount={displayAccount}
                      menuClick={click}
                      onClick={() => displaySideBar()}
                  />

              </ListWrapper>
          </PosedSideBar>
        );
    }
}

export default SideBar;