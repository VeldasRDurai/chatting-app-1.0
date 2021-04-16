import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

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

const Verifier = ({ isSignUp }) => {
    const [ username , setUsername ] = useState("");
    const [ password , setPassword ] = useState("");
    const serverVerifier = async (loc) => {
        try {
            const response = await axios.post( `http://localhost:3001/${loc}/`, 
                { username :username , password : password } , 
                { withCredentials : true } );
            window.alert(response.data);
            window.location = "/";
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
            { isSignUp ? "SIGN UP" : "LOG IN" }
            <input type="text" placeholder="Username" onChange={ (e) => setUsername(e.target.value) } />
            <input type="text" placeholder="Password" onChange={ (e) => setPassword(e.target.value) } />
            <div onClick={ () => isSignUp ? serverVerifier("sign-up") : serverVerifier("log-in") } >
                { isSignUp ? "SIGN UP" : "LOG IN" }
            </div>
        </Div>
    );
}

export default Verifier;