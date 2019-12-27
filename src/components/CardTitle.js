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
   margin-top: 10px;
   opacity: 60%;
`;

const StyledFaCommentAlt = styled(FaCommentAlt)`
  margin-right: 3px;
`;

const CardTitle = (props) => {
    const date = new Date(props.dueDate).toDateString();

  return (
      <>
          <StyledWrapper>
              <P>{props.title}</P>

              <IconWrapper>
                  <div>
                      <StyledFaCommentAlt/> <span> 20 </span>
                  </div>
                  <div>
                      <FiClock />
                      <span> {date} </span>
                  </div>
              </IconWrapper>
          </StyledWrapper>
      </>
  );
};

export default CardTitle;