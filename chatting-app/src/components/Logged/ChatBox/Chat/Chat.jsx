import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import DateDiv from "./DateDiv";
import SingleChat from "./SingleChat";

const Div = styled.div`
    height:90vh;
    width:100%;
    overflow:scroll;
    display:flex;
    flex-direction:column;
`;

const Chat = ({ allChat }) => {
    const refChatDiv = useRef();
    let currentDate = "";
    useEffect( () => {
        refChatDiv.current.scrollTop = refChatDiv.current.scrollHeight;
    });
    return (
        <Div ref={refChatDiv} >
        {
            allChat.map( (item,index) => {
                let addDateDiv = false ;
                if (currentDate !==  new Date(item.msgTime).toLocaleDateString() ){
                    addDateDiv = true;
                    currentDate = new Date(item.msgTime).toLocaleDateString() ;
                }
                return <>
                    { addDateDiv && <DateDiv date={currentDate}  key={currentDate} />} 
                    
                    <SingleChat key={index}
                        date={new Date(item.msgTime).toLocaleDateString()}
                        time={new Date(item.msgTime).toLocaleTimeString()} 
                        name={item.sendBy} 
                        chat={item.msg} 
                        read={item.read} /> 
                </> ;
            })
        }
        </Div>
    );
}

export default Chat;