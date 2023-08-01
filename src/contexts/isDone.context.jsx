import { createContext, useState, useEffect } from "react";


export const IsDoneContext = createContext({
    isDone: null,
    setIsDone: () => null,
    isDoneCadre: null,
    setIsDoneCadre: () => null,
})

export const IsDoneProvider = ({ children }) => {

    const [isDone, setIsDone] = useState(false);
    const [isDoneCadre, setIsDoneCadre] = useState(false);




    const value = { isDone, setIsDone, isDoneCadre, setIsDoneCadre };

    return <IsDoneContext.Provider value={value} >{children}</IsDoneContext.Provider>

}