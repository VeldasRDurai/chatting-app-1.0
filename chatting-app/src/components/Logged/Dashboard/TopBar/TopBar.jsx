import React from "react";
import styled from "styled-components";

import Options from "./Options/Options";

const Div = styled.div`
    >:nth-child(1){
        position:fixed;
        display:flex;
        align-items:center;
        height:10vh;
        width:100%;
        color:white;
        background-color:#374454;
        font-size:20px;
        .heading{
            flex:6;
        }
        .refresh{
            flex:2;
            display:flex;
            justify-content:center;
        }
    }
    >:nth-child(2){
        height:10vh;
        width:100%;
    }
`;

const TopBar = ({ setRefresh }) => {
    return (
        <Div>
            <div>
                <Options />
                <div className="heading" >Chatting-app</div>
                <div className="refresh"> 
                    <img onClick={ () => setRefresh(true) } 
                        src={require("../../ChatBox/ChatSender/refresh.png").default} alt="refresh" /> 
                </div>
            </div>
            <div>

            </div>            
        </Div>
    );
}

export default TopBar;