import React from "react";
import styled from "styled-components";
import {FiClock} from 'react-icons/fi'
import {FaCommentAlt} from "react-icons/fa"

const StyledWrapper = styled.div`
  margin: 0 20px 0 20px;
`;

const P = styled.p`
  margin: 0;
  font-size: 1.1em;
`;

const IconWrapper = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   font-size: .6em;
   margin-top: 5px;
   opacity: 60%;
`;

const StyledFaCommentAlt = styled(FaCommentAlt)`
  margin-right: 3px;
`;

const CardTitle = () => {
  return (
      <>
          <StyledWrapper>
              <P>Mariyuk admin CMS</P>

              <IconWrapper>
                  <div>
                      <StyledFaCommentAlt/> <span> 20 </span>
                  </div>
                  <div>
                      <FiClock />
                      <span> 21 Nov 2019 </span>
                  </div>
              </IconWrapper>
          </StyledWrapper>
      </>
  );
};

export default CardTitle;