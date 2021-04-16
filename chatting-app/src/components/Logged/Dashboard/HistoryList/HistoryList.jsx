import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import ListItems from "./ListItems/ListItems";

const Div = styled.div`
    min-height:80vh;
    display:flex;
    flex-direction:column;
`;

const HistoryList = ({ refresh , setRefresh }) => {
    const [ history , setHistory ] = useState([]);
    useEffect( () => {
        if(refresh){
            axios.get("http://localhost:3001/history-list",{ withCredentials : true })
            // axios.get("http://aqueous-falls-99364.herokuapp.com/history-list",{ withCredentials : true })
            .then( response => { console.log(response); setHistory(response.data.historyList);setRefresh(false)} )
            .catch( e => console.log(e.response) )
        }
    },[refresh,setRefresh]);
    return (
        <Div>
            {
                history.map( (item,index) => 
                item.username && <ListItems key={index} person={item} /> )
            }
        </Div>
    );
}

export default HistoryList;