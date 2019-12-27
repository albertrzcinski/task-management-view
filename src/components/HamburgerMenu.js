import React, {Component} from "react";
import styled from "styled-components";
import posed from "react-pose";

const Hamburger = styled.button`
  position: relative;
  background: none;
  border: none;
  padding: 5px;
  cursor: pointer;
  
  :focus{
    outline: none;
  }
  
  z-index: 1;
`;

const Line = styled.div`
  margin: 5px 0 6px 0;
  width: 25px;
  height: 2px;
  background-color: ${({theme}) => theme.color.brighterBlue};
`;

const Line1 = posed(Line)({
   closed: {
       rotate: 0,
       y: 0
   },
    open: {
       rotate: "405deg",
       y: "8px"
    }
});

const Line2 = posed(Line)({
    closed: {
        opacity: 1,
        x: 0
    },
    open: {
        opacity: 0,
        x: "-200%"
    }
});

const Line3 = posed(Line)({
    closed: {
        rotate: 0,
        x: 0,
        y: 0
    },
    open: {
        rotate: "315deg",
        y: "-8px"
    }
});

class HamburgerMenu extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    toggle = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    };

    render() {
        return(
            <Hamburger onClick={this.toggle}>
                <Line1 pose={this.state.isOpen ? 'open' : 'closed'}/>
                <Line2 pose={this.state.isOpen ? 'open' : 'closed'}/>
                <Line3 pose={this.state.isOpen ? 'open' : 'closed'}/>
            </Hamburger>
        )
    }
}

export default HamburgerMenu;