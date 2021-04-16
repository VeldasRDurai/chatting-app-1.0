import React, { useContext , useEffect , useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { ChatingWith } from "../../../GlobalState";

import ChatHeader from "./ChatHeader/ChatHeader";
import Chat from "./Chat/Chat";
import ChatSender from "./ChatSender/ChatSender";

const Div = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:flex-start;
    height:100%;
    width:100%;
    background-color:#e5ddd5;
`;

const ChatBox = () => {
    const chatingWith = useContext(ChatingWith);
    const [ allChat , setAllChat ] = useState([]);
    const [ refersh , setRefresh  ] = useState(false);
    
    useEffect( () => {
        axios.post("http://localhost:3001/chat-with",{ chatingWith:chatingWith },{ withCredentials : true })
        // axios.post("http://aqueous-falls-99364.herokuapp.com/chat-with",{ chatingWith:chatingWith },{ withCredentials : true })
        .then( res => { 
            console.log(res.data);
            setAllChat(res.data.allChat);
            setRefresh(false);
        })
        .catch( e => console.log(e) );
    }, [chatingWith , refersh ] );
    
    return (
        <Div>
            <ChatHeader chatingWith={chatingWith} />
            <Chat allChat={allChat} />
            <ChatSender chatingWith={chatingWith} setRefresh={setRefresh} />
        </Div>
    );
}

export default ChatBox;