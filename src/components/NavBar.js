import React, {Component} from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import {MdAddCircle} from "react-icons/md"
import HamburgerMenu from "./HamburgerMenu";
import {Formik, Form, Field} from "formik";
import axios from "axios";
import {SAVE_COLLECTION, SAVE_TAG, SAVE_TASK} from "../utils/utils";

const NavBarWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    margin: 0 20px 0 20px;
    color: ${({theme}) => theme.color.background};
`;

const CircleButton = styled.button`
  background: none;
  border: none;
  padding: 3px;
  
  :focus{
    outline: none;
  }
`;

const StyledMdAddCircle = styled(MdAddCircle)`
  height: 2.6em;
  width: 2.6em;
  color: #b0caff;
  cursor: pointer;
`;

const StyledField = styled(Field)`
  display: none;
`;

const createTask = (props, values, setSubmitting) => {
    const {collections, handleReloadTasks} = props;

    let filteredCollections = [];

    if(collections.length)
        filteredCollections = collections.filter(c => c.name === "Inbox");

    if(filteredCollections.length) {
        let dueDate = null;

        if(props.menuOption === "Today")
            dueDate = new Date().toJSON();

        if(props.menuOption === "Tomorrow") {
            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            dueDate = tomorrow.toJSON();
        }

        axios
            .post(SAVE_TASK,
                {
                    "creationDate": new Date().toJSON(),
                    "title": values.name,
                    "complete": false,
                    "dueDate": dueDate,
                    "setOfTasks": {
                        "id": filteredCollections[0].id,
                    }
                }, {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": localStorage.getItem('token')
                    }
                })
            .then(() => {
                setSubmitting(false);
                handleReloadTasks(props.menuOption);
            })
            .catch(err => {
                console.log(err);
                props.handleLogout();
            });
    }
};

const createCollectionTags = (props, values, setSubmitting) => {
    axios
        .post(props.menuOption === "Collections" ? SAVE_COLLECTION : SAVE_TAG,
            {
                "name": values.name,
                "owner": {
                    "id":  props.userId
                },
                "user": {
                    "id": props.userId
                }
            },{
                headers: {
                    "Content-type": "application/json",
                    "Authorization": localStorage.getItem('token')
                }
            })
        .then(() => {
            setSubmitting(false);
            props.handleGetCollectionTags(props.menuOption);
        })
        .catch(err => { console.log(err);
            props.handleLogout();
        });

};

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
    }
    childToggle = () =>{
        this.child.current.toggle();
    };

    render() {
        return (
            <NavBarWrapper>
                <div onClick={this.props.displaySideBar}>
                    <HamburgerMenu ref={this.child}/>
                </div>

                {this.props.menuOption !== "Settings" ?
                    <SearchBar search={this.props.search} />
                    : null
                }

                {this.props.menuOption === "Complete" ||
                    this.props.menuOption === "Shared" ||
                        this.props.menuOption === "Settings" ?
                    <CircleButton>
                    </CircleButton>
                    :
                    <Formik
                        initialValues={{name: 'New'}}
                        onSubmit={(values, {setSubmitting}) => {
                            setSubmitting(true);
                            this.props.menuOption === "Collections" ||
                            this.props.menuOption === "Tags" ?
                                createCollectionTags(this.props, values, setSubmitting)
                                :
                                createTask(this.props, values, setSubmitting);
                        }}
                    >
                        {({isSubmitting}) => (
                            <Form>
                                <StyledField
                                    type="text"
                                    name="name"
                                />

                                <CircleButton
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    <StyledMdAddCircle/>
                                </CircleButton>
                            </Form>
                        )}
                    </Formik>
                }

            </NavBarWrapper>
        );
    }
}

export default NavBar;