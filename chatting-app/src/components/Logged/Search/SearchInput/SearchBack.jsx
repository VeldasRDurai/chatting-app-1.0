import React , { useContext } from "react";
import styled from "styled-components";

import { SetPageStatLogged } from "../../Logged"; 

const Div = styled.div`
    flex:2;
    display:flex;
    justify-content:center;
    align-items:center;
    color:white;
    height:30px;
    width:30px;
    transform:rotate(180deg);
`;

const SearchBack = () => {
    const setPageStatLogged = useContext(SetPageStatLogged);
    return (
        <Div onClick={ () =>setPageStatLogged("DASHBOARD")  } >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 21" height="30" width="30">
                <path fill="currentColor" d="M1 15.75l5.2-5.2L1 5.35l1.5-1.5 6.5 6.7-6.6 6.6-1.4-1.4z">
                </path>
            </svg>
        </Div>
    );
}

export default SearchBack;