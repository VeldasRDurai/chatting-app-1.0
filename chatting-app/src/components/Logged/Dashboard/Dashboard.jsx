import React, { useState } from "react";
import styled from "styled-components";

import TopBar from "./TopBar/TopBar";
import HistoryList from "./HistoryList/HistoryList";
import Footer from "./Footer/Footer";
import Add from "./Add/Add";

const Div = styled.div`
    position:relative;
    display:flex;
    flex-direction:column;
    align-items:stretch;
    width:100%;
`;

const Dashboard = () => {
    const [ refresh , setRefresh ] = useState(true) ;
    return (
        <Div>
            <TopBar setRefresh={setRefresh} />
            <HistoryList refresh={refresh} setRefresh={setRefresh} />
            <Footer />
            <Add />
        </Div>
    );
}

export default Dashboard;