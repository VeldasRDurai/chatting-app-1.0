import React, { useContext, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import { SetPageStatApp } from "../../../App"

const Div = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    height:100vh;
    weight:100vw;
    & > div{
        user-select:none;
        background-color:black;color:white;cursor:pointer;
    }
`

const LogIn = ({ setpageStatNotLogged }) => {
    const setPageStatApp = useContext(SetPageStatApp);
    const [ username , setUsername ] = useState("");
    const [ password , setPassword ] = useState("");
    const serverVerifier = async () => {
        try {
            const response = await axios.post( `http://localhost:3001/log-in/`,
            // const response = await axios.post( `http://aqueous-falls-99364.herokuapp.com/`, 
                { username :username , password : password } , 
                { withCredentials : true } );
            window.alert(response.data);
            setPageStatApp("LOGGED");
        } catch (e) {
            if (e.response){
                if(e.response.status === 401){
                    window.alert(e.response.data);
                } else {
                    window.alert(e);   
                }
            }
        }
    }
    return (
        <Div>
            LOG IN
            <input type="text" placeholder="Username" onChange={ (e) => setUsername(e.target.value) } />
            <input type="text" placeholder="Password" onChange={ (e) => setPassword(e.target.value) } />
            <div onClick={ () => serverVerifier()} > LOG IN </div>
            <div onClick={ () => setpageStatNotLogged("DEFAULT") }> 🔙 BACK </div>
        </Div>
    );
}

export default LogIn ;