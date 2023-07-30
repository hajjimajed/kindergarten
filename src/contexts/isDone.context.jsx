import { createContext, useState, useEffect } from "react";


export const IsDoneContext = createContext({
    isDone: null,
    setIsDone: () => null,
})

export const IsDoneProvider = ({ children }) => {

    const [isDone, setIsDone] = useState(false);




    const value = { isDone, setIsDone };

    return <IsDoneContext.Provider value={value} >{children}</IsDoneContext.Provider>

}