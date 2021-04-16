import React from "react";
import styled from "styled-components";

const Div = styled.div`
    display:flex;
    justify-content:space-evenly;
    align-items:center;
    height:100vh;
    weight:100vw;
    > div{
        user-select:none;
        border:1px solid black; color:white; background-color:black;cursor:pointer;padding:10px;
        :hover{color:black ; background-color:white; font-weight:700;}
        :focus{outline:none;}
    }
`

const UserVerification = () => {
    return (
        <Div>
            <div onClick={ () => window.location = "/sign-up"} > Sign up </div>
            <div onClick={ () => window.location = "/homepage"}> HomePage</div>
            <div onClick={ () => window.location = "/log-in"}  > Log in  </div>
        </Div>
    );
}

export default UserVerification;