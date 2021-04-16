import React from "react";
import styled  , { keyframes } from "styled-components";

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;
const Div = styled.div`
    height:100%;
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    & > div{
        border: 16px solid #f3f3f3;
        border-radius: 50%;
        border-top: 16px solid #3498db;
        width: 120px;
        height: 120px;
        animation: ${spin} 2s linear infinite;
    }
`;

const Loading = () => {
    return (
        <Div>
            <div></div>
        </Div>
    );
}

export default Loading;