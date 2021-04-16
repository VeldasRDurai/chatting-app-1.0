import React from "react";
import styled from "styled-components";

const Div = styled.div`
    height:10vh;
    display:flex;
    justify-content:center;
    align-items:center;
    color:#888989;
    font-size:15px;
    font-weight:600;
`;

const Footer = () => {
    return(
        <Div>
            By Veldas R Durai
        </Div>
    );
}

export default Footer;