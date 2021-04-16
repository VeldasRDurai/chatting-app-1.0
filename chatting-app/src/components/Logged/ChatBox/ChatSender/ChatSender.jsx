import React, { useRef } from "react";
import axios from "axios";
import styled from "styled-components";

const Div = styled.div`
    width:100%;
    height:5vh;
    display:flex;
    background-color:none;
    align-items:stretch;
    justify-content:flex-start;
    >:nth-child(1){
        border:1px solid #656565;
        padding:15px;
        flex:8;
        :focus{ outline:none; }
    }
    >:nth-child(2),>:nth-child(3){
        flex:1;
        padding: 0px 2px;
        background-color:white;
        box-sizing:border-box;
        border:1px solid #656565;
        display:flex;
        justify-content:center;
        align-items:center;
        :focus{ outline:none; }
    }
`;

const ChatSender = ({ chatingWith , setRefresh }) => {
    const refInput = useRef();
    const sendMsg = async () => {
        try{
            const response =await axios.post("http://localhost:3001/send-msg",
                {chatingWith:chatingWith,msg:refInput.current.value},{ withCredentials : true });
            // const response =await axios.post("http://aqueous-falls-99364.herokuapp.com/send-msg",
            //     {chatingWith:chatingWith,msg:refInput.current.value},{ withCredentials : true });
            console.log(response);
            refInput.current.value="";
            setRefresh(true);
        } catch(e){
            console.log(e.response);
        }
    }
    return (
        <Div>
            <input ref={refInput} type="text" placeholder="Type here..." />
            <button onClick={sendMsg} > 
                <img src={require("./send.png").default} alt="send"/> 
            </button>
            <button onClick={() => setRefresh(true) } > 
                <img src={require("./refresh.png").default} alt="refresh"/> 
            </button>
        </Div>
    );
}

export default ChatSender;  