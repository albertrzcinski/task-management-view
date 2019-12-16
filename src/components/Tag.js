import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  margin: 0 7px 7px 0;
  height: fit-content;
  width: fit-content;
  background-color: ${({theme}) => theme.color.pink};
  color: ${({theme}) => theme.color.darkPink};
  box-shadow: 0 0 2px 0 rgba(0,0,0,0.15);
`;

const P = styled.p`
  margin: 0;
  padding: 3px 7px 3px 7px;
  font-size: .55em;
`;

const Tag = () => {
    return (
        <StyledWrapper>
            <P>Developing</P>
        </StyledWrapper>
    );
};

export default Tag;