import React, { useEffect , useState } from "react";
import axios from "axios";
import styled from "styled-components";

import Loading from "../Loading/Loading";

const Div = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    height:100vh;
    weight:100vw;
`

const HomePage = () => {
    const [ pageStat , setPageStat ] = useState( "LOADING" );
    const [ name , setName ] = useState("");

    const dataFetcher = async () => {
        try{
            const response = await axios.get("http://localhost:3001/my-name/",{ withCredentials : true });
            setPageStat("LOGGED");
            setName(response.data.username);
        } catch (e) {
            if( e.response ){
                console.log(e.response.data);
                setPageStat("NOT_LOGGED");
            } else { 
                console.log(e);
                setPageStat("NETWORK_ISSUES");
            } 
        }
    }
    useEffect( () =>  dataFetcher() , []);
    return (
        <Div>
            { 
                pageStat === "LOADING" ? 
                    <Loading /> :
                pageStat === "LOGGED" ?
                    <div> This is HomePage of {name} </div> :
                pageStat === "NOT_LOGGED" ?
                    <div> You are not logged in </div> :
                pageStat === "NETWORK_ISSUES" ?
                    <div> unable to reach server </div> : null 
            }
        </Div>
    );
}

export default HomePage;