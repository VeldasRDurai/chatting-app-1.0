import React, { useContext } from "react";
import axios from "axios";
import styled from "styled-components";

import { SetPageStatApp } from "../../../../../../App";

const Div = styled.div`
    position:absolute;
    top:0;left:0;
    height:100vh;
    width:100vw;
    & > div {
        position:absolute;
        top:6%;left:9%;
        user-select:none;
        cursor:pointer;
        // display:flex;
        // flex-direction:column;
        color:black;
        background-color:white;
        padding:5px 15px;
        border: 1px solid #656565;
        border-radius:3px;
        :hover{ background-color:#e1e1e1; }
    }
`;

const LogOut = ({ setShowLogOut }) => {
    const setPageStatApp = useContext(SetPageStatApp);
    const logOut = async () => {
        try { 
            const response = await axios.get( "http://localhost:3001/log-out" , { withCredentials : true });
            // const response = await axios.get( "http://aqueous-falls-99364.herokuapp.com/log-out" , { withCredentials : true });
            console.log(response);
            window.alert(response.data);
            setPageStatApp("NOT_LOGGED");
        } catch (e){
            if(e.response){ console.log(e.response.data); }
            else { console.log(e); }
        }
    }

    return (
        <Div onClick={() => setShowLogOut(false)} >
           <div onClick={ logOut } > LOG OUT </div>
        </Div>
    );
}

export default LogOut ;