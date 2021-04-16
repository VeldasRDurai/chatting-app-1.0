import React , { useContext } from "react";
import styled, { css } from "styled-components";

import { ChatingWith } from "../../../../GlobalState";

import { SingleTick , DoubleTick } from "./Tick";

const Div = styled.div`
    margin: 3px 10px;
    height: auto;
    width: auto;
    max-width:60vw;
    color: black;
    box-shadow: grey 2px 2px 4px;
    border-radius: 7px;
    padding: 0px 10px;
    font-size: 16px ;
    overflow-wrap: break-word;
    >:nth-child(1){
        font-size: 13px;
        font-weight: 600;
    }
    >:nth-child(3){
        font-size:10px;
        text-align:end;
        color:#8c8c8c;
    }
    ${ ({ name , chatingWith }) => {
        return ( name !== chatingWith ) ? css`
            align-self:flex-end;
            background-color:#dcf8c6;
            >:nth-child(1){color:#44d19e;}
        `:css`
            align-self:flex-start;
            background-color:white;
            >:nth-child(1){color:rgb(33, 123, 236);}
        `;
    }};
`

const SingleChat = ({ date , time , name , chat , read }) => {
    const chatingWith = useContext(ChatingWith);

    return (
        <Div name={name} chatingWith={chatingWith} >
            <div>{ name === chatingWith ? name : "You" }</div>
            <div>{chat}</div>
            <div>
                {date + " " + time + "  "} 
                { read ? <DoubleTick/> : <SingleTick/> }
            </div>
        </Div>
    );
}

export default SingleChat;