import React, {Component} from "react";
import CollectionTagsCard from "../components/CollectionTagsCard";
import styled, {css} from "styled-components";

const CollectionsTagsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 80%;
 
  ${({theme}) => theme.media.tablet} {
    align-items: flex-start;
    padding-left: 50px;
    width: 60%;
  }
  
  ${({isCollections, isTags}) => (isCollections || isTags) && 
    css`
      ${({theme}) => theme.media.tablet} {
        align-items: center;
        padding-left: 0;
        width: 80%;
      }
    `}
`;

const H3 = styled.h3`
/*    width: 90%;
    margin: 1em auto;*/
`;

class CollectionTags extends Component{
    state = {
        collections: this.props.collections,
        tags: this.props.tags
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.collections !== prevProps.collections)
            this.setState({
                collections: this.props.collections,
            });

        if(this.props.tags !== prevProps.tags)
            this.setState({
                tags: this.props.tags,
            });
    }

    render() {
        const {text, menuOption, click, handleLogout, userId, handleGetCollectionTags,
            isCollections, isTags, selectedTask, reloadTasks} = this.props;
        const {collections, tags} = this.state;

        return (
            <CollectionsTagsWrapper isCollections={isCollections} isTags={isTags}>
                {menuOption &&
                    <H3>{menuOption}</H3>
                }

                {menuOption === "Collections" ?
                    collections.length ?
                        collections
                            .filter(collection => collection.name.toLowerCase().includes(text.toLowerCase()))
                            .map(
                                ({id, name}) => (
                                    <CollectionTagsCard
                                        key={id}
                                        id={id}
                                        title={name}
                                        click={click}
                                        menuOption={menuOption}
                                        handleLogout={handleLogout}
                                        userId={userId}
                                        getData={handleGetCollectionTags}
                                    />
                                )
                            )
                        :
                        <h4>
                            You don't have any collections.
                        </h4>
                    : null
                }

                {menuOption === "Tags" ?
                    tags.length ?
                        tags
                            .filter(tag => tag.name.toLowerCase().includes(text.toLowerCase()))
                            .map(({id, name}) => (
                                <CollectionTagsCard
                                    key={id}
                                    id={id}
                                    title={name}
                                    click={click}
                                    menuOption={menuOption}
                                    handleLogout={handleLogout}
                                    userId={userId}
                                    getData={handleGetCollectionTags}
                                />
                            ))
                        :
                        <h4>
                            You don't have any tags.
                        </h4>
                    : null
                }

                {isCollections &&
                    <h3> Choose collection </h3>
                }

                {isCollections ?
                    collections.length ?
                        collections
                            .filter(c => c.id !== selectedTask.setOfTasks.id)
                            .map(({id, name}) => (
                                <CollectionTagsCard
                                    isCollections
                                    key={id}
                                    id={id}
                                    title={name}
                                    //click={click}
                                    //menuOption={menuOption}
                                    handleLogout={handleLogout}
                                    selectedTaskId={selectedTask.id}
                                    reloadTasks={reloadTasks}
                                    menuClick={this.props.menuClick}
                                />
                            ))
                        :
                        <h4>
                            You don't have any collection to choose.
                        </h4>
                    : null
                }

                {isTags && selectedTask.tags.length ?
                    <h4>Current tags</h4>
                    : null
                }

                {isTags ?
                    selectedTask.tags.length ?
                        selectedTask.tags
                            .map(({id,name}) => (
                                <CollectionTagsCard
                                    isSelectedTaskTags
                                    key={id}
                                    id={id}
                                    title={name}
                                    //click={click}
                                    //menuOption={menuOption}
                                    handleLogout={handleLogout}
                                    selectedTaskId={selectedTask.id}
                                    reloadTasks={reloadTasks}
                                    menuClick={this.props.menuClick}
                                />
                            ))
                        :
                        <div><></></div>
                    : null
                }

                {isTags && tags.length ?
                    <>
                        <h4>Other tags</h4>
                        <div><></></div>
                    </>
                    : null
                }

                {isTags ?
                    tags.length ?
                        tags
                            .filter(t => {
                                let selectedTag = selectedTask.tags.filter(st => st.id === t.id);
                                if(selectedTag.length)
                                    return null;

                                return t;
                            })
                            .map(({id,name}) => (
                                <CollectionTagsCard
                                    isTags
                                    key={id}
                                    id={id}
                                    title={name}
                                    //click={click}
                                    //menuOption={menuOption}
                                    handleLogout={handleLogout}
                                    selectedTaskId={selectedTask.id}
                                    reloadTasks={reloadTasks}
                                    menuClick={this.props.menuClick}
                                />
                            ))
                        :
                        <h4>
                            You don't have any tags to choose.
                        </h4>
                        : null
                }
            </CollectionsTagsWrapper>

        );
    }
}

export default CollectionTags;