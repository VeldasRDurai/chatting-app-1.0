import React, { useState } from "react";

export const ChatingWith = React.createContext();
export const SetChatingWith = React.createContext();

const GlobalState = ({ children }) => {
    const [ chatingWith , setChatingWith ] = useState("");
    return (
        <ChatingWith.Provider value={chatingWith} >
            <SetChatingWith.Provider value={setChatingWith} >
                {children}
            </SetChatingWith.Provider>
        </ChatingWith.Provider>
    );

}

export default GlobalState;