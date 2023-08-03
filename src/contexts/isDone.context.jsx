import { createContext, useState, useEffect } from "react";


export const IsDoneContext = createContext({
    isDone: null,
    setIsDone: () => null,
    isDoneCadre: null,
    setIsDoneCadre: () => null,
    isDoneActivity: null,
    setIsDoneActivity: () => null,
    isDoneProject: null,
    setIsDoneProject: () => null,
})

export const IsDoneProvider = ({ children }) => {

    const [isDone, setIsDone] = useState(false);
    const [isDoneCadre, setIsDoneCadre] = useState(false);
    const [isDoneActivity, setIsDoneActivity] = useState(false);
    const [isDoneProject, setIsDoneProject] = useState(false);



    const value = { isDone, setIsDone, isDoneCadre, setIsDoneCadre, isDoneActivity, setIsDoneActivity, isDoneProject, setIsDoneProject };

    return <IsDoneContext.Provider value={value} >{children}</IsDoneContext.Provider>

}