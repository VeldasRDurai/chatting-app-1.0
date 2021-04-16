import React , {useContext} from "react";
import styled from "styled-components";

import ItemImg from "./ItemImg";

import { SetChatingWith } from "../../../../../GlobalState";
import { SetPageStatLogged } from "../../../Logged";

const Div = styled.div`
    display:flex;
    align-items:center;
    height:65px;
    .ItemDetail{
        align-self:stretch;
        flex:1;
        display:flex;
        flex-direction:column;
        justify-content:space-around;
        padding: 5px;
        box-sizing:border-box;
        border-bottom:1px solid #e1e1e1;
    }
    .Name{
        display:flex;
        >:nth-child(1){ 
            flex:1; 
            font-size:20px;
        }
        >:nth-child(2){ color:#656565; }
    }
    .About{
        padding-right:3px;
        display:flex;
        >:nth-child(1){ 
            flex:1; 
            color:#656565; 
            font-family:monospace;
        }
        >:nth-child(2){
            height:20px;
            width:20px;
            border-radius:10px;
            align-self:flex-end;
            color:white;
            background-color:#06d755;
            display:flex;
            justify-content:center;
            align-items:center;
            font-size:15px;
        }
    }
`;

const ListItems = ({ person }) => {
    const setPageStatLogged = useContext(SetPageStatLogged);
    const setChatingWith = useContext(SetChatingWith);
    return (
        <Div onClick={ () => {setPageStatLogged("CHATBOX"); setChatingWith(person.username);}} >
            <ItemImg />
            <div className="ItemDetail" >
                <div className="Name" >
                    <div>{person.username}</div>
                    <div>{new Date(person.lastMsgTime).toLocaleTimeString()}</div>
                </div>
                <div className="About" >
                    <div>{ person.lastSendBy + " : " + person.lastMsg }</div>
                    {
                        person.unRead !== 0 &&
                        <div> <div>{person.unRead}</div> </div>
                    }
                </div>
            </div>
        </Div>
    );
}

export default ListItems;