import { createContext, useState } from "react";

const GlobalContext = createContext();

function GlobalContextProvider({ children }) {
    const [state, setState] = useState(false); // Using setState instead of dispatch

    return (
        <GlobalContext.Provider value={{ state, setState }}>
            {children}
        </GlobalContext.Provider>
    );
}

export { GlobalContext, GlobalContextProvider };
