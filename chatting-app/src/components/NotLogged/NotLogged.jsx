import React , { useState } from "react";
import styled from "styled-components";

import SignUp from "./SignUp/SignUp";
import LogIn from "./LogIn/LogIn";

const Div = styled.div`
    display:flex;
    justify-content:space-evenly;
    align-items:center;
    height:100%;
    weight:100%;
    > button {
        user-select:none;
        border:1px solid black; color:white; background-color:black;cursor:pointer;padding:10px;
        :hover{color:black ; background-color:white; font-weight:700;}
        :focus{outline:none;}
    }
`;

const NotLogged = () => {
    const [ pageStatNotLogged , setpageStatNotLogged ] = useState( "DEFAULT" );
    return (
        <Div>
            {
                pageStatNotLogged === "DEFAULT" ?
                    <> 
                        <button onClick={ () => setpageStatNotLogged("SIGN_UP") } > Sign up</button>
                        <button onClick={ () => setpageStatNotLogged("LOG_IN")  } > Log in </button> 
                    </>:
                pageStatNotLogged === "SIGN_UP" ?
                    <SignUp 
                        setpageStatNotLogged={setpageStatNotLogged} /> :
                pageStatNotLogged === "LOG_IN" ?
                    <LogIn 
                    setpageStatNotLogged={setpageStatNotLogged} />  : null 
            }
        </Div> 
    );
}

export default NotLogged;