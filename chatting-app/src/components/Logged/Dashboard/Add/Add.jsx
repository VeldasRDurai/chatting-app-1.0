import React, { useContext } from "react";
import styled from "styled-components";

import { SetPageStatLogged } from "../../Logged";

import SearchIcon from "./Search";

const Div = styled.div`
    position:fixed;
    bottom:45px;right:15px;
    display:flex;
    justify-content:center;
    align-items:center  ;
    height:45px;
    width:45px;
    border-radius:23px;
    font-size:40px;
    font-weight:900;
    color:white;
    background-color:#06d755;
    box-shadow:0 0 10px 0px #656565 ;
`;

const Add = () => {
    const setPageStatLogged = useContext(SetPageStatLogged);
    return (
        <Div onClick={ () => setPageStatLogged("SEARCH") } >
            <SearchIcon />
        </Div>
    );
}

export default Add;