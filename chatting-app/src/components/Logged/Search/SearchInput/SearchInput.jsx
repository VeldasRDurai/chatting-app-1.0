import React, { useRef } from "react";
import styled from "styled-components";

import SearchBack from "./SearchBack";
import SearchIcon from "../../Dashboard/Add/Search";

const Div = styled.div`
    >:nth-child(1){
        height:10vh;
        width:100%;
        position:fixed;
        top:0;left:0;
        color:white;
        background-color:#374454;
        display:flex;
        justify-content:flex-start;
        align-items:center;
        overflow:hidder;
    }
    >:nth-child(2){   
        height:10vh;
        width:100%;
    }
`;

const Input = styled.input`
    flex:6;
    height:20px;
    border:none;
    border-radius:5px;
    font-size:17px;
    color:white;
    background-color:inherit;
    :focus{
        outline:none;
        color:black;
        background-color:white;
    }
`;

const SearchInput = ({ setSearchText }) => {
    const refInput = useRef();
    return (
        <Div>
            <div>
                <SearchBack />
                <Input ref={refInput} type="text" placeholder="Search..." 
                    spellCheck={false}
                    onChange={ e => setSearchText(e.target.value)  } />
                <SearchIcon onClick = { () => refInput.current.blur() } />
            </div>
            <div>
                below
            </div>
        </Div>
    );
}

export default SearchInput;