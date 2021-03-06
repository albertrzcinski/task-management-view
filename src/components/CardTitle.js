import React from "react";
import styled, {css} from "styled-components";
import {FiClock} from 'react-icons/fi'
import {FaCommentAlt} from "react-icons/fa"
import {IoMdCheckmarkCircleOutline} from "react-icons/io"
import {MdSettingsBackupRestore} from "react-icons/md"
import {FaTrashAlt} from "react-icons/fa"
import {displayNotification} from "../utils/utils";

const StyledWrapper = styled.div`
  margin: 0 20px 0 20px;
`;

const P = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  font-size: 1.1em;
`;

const Span = styled.span`
  cursor: pointer;
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

const sharedCss = css`
  padding: 5px;
  height: 1.7em;
  width: 1.7em;
  opacity: 50%;
  color: ${({theme}) => theme.color.lightblue};
  cursor: pointer;
  
  :hover {
    opacity: 100%;
  }
`;

const StyledCheckMark = styled(IoMdCheckmarkCircleOutline)`
  ${sharedCss}
`;

const StyledFaTrashAlt = styled(FaTrashAlt)`
  ${sharedCss}
`;

const StyledMdSettingsBackupRestore = styled(MdSettingsBackupRestore)`
  ${sharedCss};
`;

const CardTitle = (props) => {
    const {id, handleComplete, handleDelete, tags, complete, title, trash, onClick, dependentTask} = props;
    const date = new Date(props.creationDate).toDateString();
    return (
        <>
            <StyledWrapper>

                <P>
                    <Span onClick={onClick}>{title}</Span>
                    {trash && !tags.length ?
                    <span>
                        <StyledMdSettingsBackupRestore onClick={() => handleComplete(id)}/>
                        <StyledFaTrashAlt onClick={() => handleDelete(id)}/>
                    </span>
                        : null
                    }

                    {!tags.length && complete ?
                        <StyledCheckMark onClick={() => {
                            if(dependentTask !== null){
                                if(dependentTask.complete === true) handleComplete(id);
                                else displayNotification("Cannot completed this task. Complete dependent tasks first.", "warning")
                            }
                            else handleComplete(id)
                        }}/>
                        :null
                    }
                </P>

                <IconWrapper>
                    <div>
                        <StyledFaCommentAlt/>
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
