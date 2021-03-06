import React from "react";
import {FiSearch} from "react-icons/fi";
import styled from "styled-components";

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 6px;
  background-color: ${({theme}) => theme.color.search};
  opacity: 90%;
  border-radius: 5px;
  
  ${({theme}) => theme.media.tablet} {
    height: 35px;
  }
`;

const StyledInput = styled.input`
  min-width: 50px;
  overflow: hidden;
  width: 100%;
  padding-left: 10px;
  border: none;
  background: none;
  color: ${({theme}) => theme.color.background};
  
  ::placeholder{
    color: ${({theme}) => theme.color.background}};
   }
   
   :focus{
    outline: none;
   }
`;

const SearchBar = (props) => {
    return (
        <SearchWrapper>
            <FiSearch />
            <StyledInput
                type="search"
                placeholder="Search here..."
                onInput={(e) => props.search(e.target.value)}
                onFocus={(e) => props.search(e.target.value)}
            />
        </SearchWrapper>
    );
};

export default SearchBar;