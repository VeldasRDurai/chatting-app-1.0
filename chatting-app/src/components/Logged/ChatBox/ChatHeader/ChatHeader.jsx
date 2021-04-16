import React from "react";
import styled from "styled-components";

import ChatImg from "./ChatImg";
import ChatBack from "./ChatBack";

const Div = styled.div`
    >:nth-child(1){
        display:flex;
        align-items:center;
        position:fixed;
        top:0;left:0;
        height:10vh;
        width:100vw;
        color:white;
        background-color:#374454;
        .name{
            padding:10px;
            flex:1;
        }
    }
    >:nth-child(2){
        height:10vh;
        width:100%;
    }
`;

const ChatHeader = ({ chatingWith }) => {
    return (
        <Div>
            <div>
                <ChatBack />
                <ChatImg />
                <div className="name" > {chatingWith} </div>
            </div>
            <div>

            </div>
        </Div>
    );
}

export default ChatHeader;