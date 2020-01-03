import React, {Component} from "react";
import CollectionTagsCard from "../components/CollectionTagsCard";
import axios from "axios";
import {displayNotification, USER_COLLECTIONS, USER_TAGS} from "../utils/utils";


class CollectionTags extends Component{
    state = {
        collections: [],
        tags: []
    };

    getCollectionTagsData = (type) => {
       axios
          .get(type === "Collections" ? USER_COLLECTIONS : USER_TAGS,
              {
                  params: {
                    userId: this.props.userId
                  },
                  headers: {
                      "Content-Type": 'application/json',
                      "Authorization": localStorage.getItem('token')
                  }
          })
          .then(res => {
              if(res.status === 200) {
                  type === "Collections" ?
                      this.setState({
                        collections: res.data
                      })
                      :
                      this.setState({
                          tags: res.data
                      })
              }
          })
          .catch(err => {
              if (!err.response) {
                  // connection refused
                  displayNotification("Server is not responding. Try again later.", "danger");
              } else {
                  // 403
                  this.props.handleLogout();
              }

          });
    };

    componentDidMount() {
        this.getCollectionTagsData(this.props.menuOption);
    }

    render() {
        const {text, menuOption, click, handleLogout, userId} = this.props;
        const {collections, tags} = this.state;

        return (
            <>
                <h3>{menuOption}</h3>

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
                                        getData={this.getCollectionTagsData}
                                    />
                                )
                            )
                        :
                        //TODO inbox jest nie usuwalny
                        <h4>
                            You don't have any collections.
                        </h4>
                    :
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
                                    getData={this.getCollectionTagsData}
                                />
                            ))
                        :
                        <h4>
                            You don't have any tags.
                        </h4>
                }
            </>

        );
    }
}

export default CollectionTags;