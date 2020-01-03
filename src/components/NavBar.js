import React, {Component} from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import {MdAddCircle} from "react-icons/md"
import HamburgerMenu from "./HamburgerMenu";
import {Formik, Form, Field} from "formik";
import axios from "axios";
import {SAVE_COLLECTION, SAVE_TAG} from "../utils/utils";

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

                <SearchBar search={this.props.search} />


                <Formik
                    initialValues={{name: 'New'}}
                    onSubmit={(values, {setSubmitting}) => {
                        setSubmitting(true);
                        this.props.menuOption === "Collections" ||
                            this.props.menuOption === "Tags" ?
                                createCollectionTags(this.props,values,setSubmitting)
                        :
                        console.log("TASK");
                        setSubmitting(false);
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

            </NavBarWrapper>
        );
    }
}

export default NavBar;