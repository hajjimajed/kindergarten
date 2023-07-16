import { createContext, useState, useEffect } from "react";


export const TogglesContext = createContext({
    dConfirmation: null,
    setDConfirmation: () => null,
    isAddChild: null,
    setIsAddChild: () => null,
    isUpdateChild: null,
    setIsUpdateChild: () => null,
})


export const TogglesProvider = ({ children }) => {

    const [dConfirmation, setDConfirmation] = useState(false);
    const [isAddChild, setIsAddChild] = useState(false);
    const [isUpdateChild, setIsUpdateChild] = useState(false);


    const value = { dConfirmation, setDConfirmation, isAddChild, setIsAddChild, isUpdateChild, setIsUpdateChild };

    return <TogglesContext.Provider value={value} >{children}</TogglesContext.Provider>

}