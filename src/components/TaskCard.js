import React from 'react';
import styled, {css} from 'styled-components';
import Tag from "./Tag";
import CardTitle from "./CardTitle";
import {IoMdCheckmarkCircleOutline} from "react-icons/io"
import {FaTrashAlt} from "react-icons/fa"
import {MdSettingsBackupRestore} from "react-icons/md"
import {displayNotification} from "../utils/utils";

const TaskWrapper = styled.div`
  margin: 20px 0 20px 0;
  width: 80vw;
  height: auto;
  background-color: ${({theme}) => theme.color.white};
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.3);
  border-radius: 5px;
  cursor: pointer;
  
   &:hover{
    border: 1px solid cornflowerblue;
  }
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

const sharedCss = css`
  padding: 5px 5px 5px 5px;
  height: 1.9em;
  width: 1.9em;
  opacity: 50%;
  color: ${({theme}) => theme.color.lightblue}
  
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
  ${sharedCss}
`;

const TaskCard = (props) => {
    const {id, desc, trash, complete, title, dueDate, tags, handleComplete, handleDelete, onClick, dependentTask} = props;

    return (
            <>
                    <TaskWrapper>
                        <TopWrapper>
                            <TagWrapper>
                                {tags.map((tag) => (
                                    <Tag key={tag.id} name={tag.name}/>
                                ))}
                            </TagWrapper>
                            {trash && tags.length ?
                                <span>
                                    <StyledMdSettingsBackupRestore onClick={() => handleComplete(id)}/>
                                    <StyledFaTrashAlt onClick={() => handleDelete(id)}/>
                                </span>
                                :null
                            }
                            {complete && tags.length ?
                                <StyledCheckMark onClick={() => {

                                dependentTask !== null ?
                                    displayNotification("Cannot completed this task. Complete dependent tasks first.", "warning")
                                :
                                    handleComplete(id)
                                }}/>
                                : null
                            }
                        </TopWrapper>

                        <CardTitle
                            title={title}
                            dueDate={dueDate}
                            tags={tags}
                            complete={complete}
                            trash={trash}
                            handleComplete={handleComplete}
                            handleDelete={handleDelete}
                            id={id}
                            onClick={onClick}
                            dependentTask={dependentTask}
                        />

                        {desc &&
                            <Description>
                                <span>
                                    {desc.length>85 ?
                                        desc.slice(0,85) + ' ...'
                                        : desc.slice(0,90) + ''}
                                </span>
                            </Description>
                        }

                        <Footer/>

                    </TaskWrapper>
            </>
    );
};

export default TaskCard;