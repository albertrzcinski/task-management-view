import React, {Component} from "react";
import styled, {css} from "styled-components";

const ZDiv = styled.div`
  position: absolute;
  background-color: ${({theme}) => theme.color.lightblue};
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  opacity: 0;
  
    ${props => props.click &&
    css`
       opacity: 70%;
    `}
  
`;

const Span = styled.span`
  display: block;
  top: 10%;
  left: 45%;
  position: relative;
  font-size: 3em;
  color: ${({theme}) => theme.color.background}
  
  ${props => props.digit > 0 &&
    css`
      :before{
        content: "${props.digit}";
      }
    `}
`;

class DigitDiv extends Component {
    state = {
        digit: 0,
        isClicked: false
    };

    render() {
        return (
            <ZDiv
                click={this.state.isClicked}
                onClick={() => {
                this.setState({
                    digit: this.props.number,
                    isClicked: true
                })
            }}>
                <Span
                    digit={this.state.digit}
                />
            </ZDiv>
        );
    }

}

export default DigitDiv;