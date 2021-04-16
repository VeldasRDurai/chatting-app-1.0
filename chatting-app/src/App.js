import React , { useState , useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import GlobalState from "./GlobalState";
import Loading from "./components/Loading/Loading";
import Logged from "./components/Logged/Logged";
import NotLogged from "./components/NotLogged/NotLogged";

export const SetPageStatApp = React.createContext();

const Div = styled.div`
  height:100vh;
  width:100vw;
`; 

const App = () => {
  const [ pageStatApp , setPageStatApp ] = useState( "LOADING" );
  const [ name , setName ] = useState("");

  const dataFetcher = async () => {
      try{
          const response = await axios.get("http://localhost:3001/my-name/",{ withCredentials : true });
          // const response = await axios.get("http://aqueous-falls-99364.herokuapp.com/my-name/",{ withCredentials : true });
          setPageStatApp("LOGGED");
          setName(response.data.username);
      } catch (e) {
          if( e.response ){
              console.log(e.response.data);
              setPageStatApp("NOT_LOGGED");
          } else { 
              console.log(e);
              setPageStatApp("NETWORK_ISSUES");
          } 
      }
  }
  useEffect( () =>  dataFetcher() , [ pageStatApp ]);

  return (
    <GlobalState> 
    <SetPageStatApp.Provider value={setPageStatApp}>
      <Div>
        {
          pageStatApp === "LOADING" ? 
              <Loading /> :
          pageStatApp === "LOGGED" ?
              <Logged name={name} /> :
          pageStatApp === "NOT_LOGGED" ?
              <NotLogged /> :
          pageStatApp === "NETWORK_ISSUES" ?
              <div> unable to reach server </div> : null
        }
      </Div>
    </SetPageStatApp.Provider>
    </GlobalState>
  );
}

export default App;
