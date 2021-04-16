import React , { useState } from "react";
import styled from "styled-components";

import Dashboard from "./Dashboard/Dashboard";
import Search from "./Search/Search";
import ChatBox from "./ChatBox/ChatBox";

export const SetPageStatLogged = React.createContext();

const Div = styled.div`
    height:100%;
    width:100%;
`;

const Logged = ({ name }) => {
    const [ pageStatLogged , setPageStatLogged ] = useState( "DASHBOARD" );
    return (
        <Div>
        <SetPageStatLogged.Provider value={setPageStatLogged} >
            {
                pageStatLogged === "DASHBOARD" ? 
                    <Dashboard />  : 
                pageStatLogged === "SEARCH" ?
                    <Search />     :
                pageStatLogged === "CHATBOX" ?
                    <ChatBox />   : null 
            } 
        </SetPageStatLogged.Provider>
        </Div>
    );
}

export default Logged;