import React, { useState } from "react";
import styled from "styled-components";

import LogOut from "./LogOut/LogOut";

const Div = styled.div`
    flex:2;
    display:flex;
    align-items:center;
    justify-content:center;
    .options{
        cursor:pointer;
    }
`;

const Options = () => {
    const [ showLogOut , setShowLogOut ] = useState(false);
    return (
        <Div>
            <div className="options" onClick={ () => setShowLogOut(true) } > 
                ≡ 
            </div>
            { showLogOut && <LogOut setShowLogOut={setShowLogOut} /> }
        </Div>
    );
}

export default Options;