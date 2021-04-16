import React , { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { SetChatingWith } from "../../../GlobalState";
import { SetPageStatLogged } from "../Logged";

import SearchInput from "./SearchInput/SearchInput";

const Div = styled.div`
    position:relative;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:flex-start;
    width:100%;
`;

const Search = () => {
    const setPageStatLogged = useContext(SetPageStatLogged);
    const setChatingWith = useContext(SetChatingWith);
    const [ searchText , setSearchText ] = useState("");
    const [ userList , setUserList ] = useState([]);
    useEffect( () => {
        axios.post( `http://localhost:3001/search-user`, { searchText : searchText }, { withCredentials : true })
        // axios.post( `http://aqueous-falls-99364.herokuapp.com/search-user`, { searchText : searchText }, { withCredentials : true })
            .then( response => setUserList(response.data.userList))
            .catch( e => console.log(e) )
    } , [searchText] );
    return (
        <Div>
            <SearchInput setSearchText={setSearchText} />
            <div>
                { searchText.length!==0 && userList.map( (item,index) => 
                    <div key={index} 
                        onClick={ () => { setPageStatLogged("CHATBOX"); setChatingWith(item.username); }} >
                        {item.username}</div>
                ) }
            </div>
        </Div>
    );
}

export default Search;