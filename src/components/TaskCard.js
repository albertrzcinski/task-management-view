import React from 'react';
import styled from 'styled-components';
import Tag from "./Tag";
import CardTitle from "./CardTitle";
import {IoMdCheckmarkCircleOutline} from "react-icons/io"

const TaskWrapper = styled.div`
  margin: 20px 0 20px 0;
  width: 80vw;
  height: auto;
  background-color: ${({theme}) => theme.color.white};
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.3);
  border-radius: 5px;
`;

const TopWrapper = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   margin: 15px 20px 0 20px;
`;

const TagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Footer = styled.div`
  background-color: ${({theme}) => theme.color.lightblue};
  height: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  margin-top: 15px;
`;

const Description = styled.div`
  margin: 20px 20px 0 20px;
  font-size: .8em;
  opacity: 80%;
  font-family: "Myanmar Text",serif;
`;

const StyledCheckMark = styled(IoMdCheckmarkCircleOutline)`
  padding: 5px 5px 5px 5px;
  height: 1.8em;
  width: 1.8em;
  opacity: 40%;
  
  :hover {
    opacity: 100%;
  }
`;

const text = 'It is a long established fact that a reader will be distracted by the readable content of a page.';
const text2 = 'It is a long established fact that a reader will be distracted.';

const TaskCard = (props) => {
    return (
            <>
                    <TaskWrapper>
                        <TopWrapper>
                            <TagWrapper>
                                <Tag/>
                                <Tag/>
                            </TagWrapper>
                            <StyledCheckMark/>
                        </TopWrapper>

                        <CardTitle/>

                        {props.withDescription ?
                            <Description>
                                <span>
                                    {text.length>85 ? text.slice(0,85) + ' ...' : text2.slice(0,90) + ''}
                                </span>
                            </Description>
                            : null
                        }

                        <Footer/>

                    </TaskWrapper>
            </>
    );
};

export default TaskCard;