import { createContext, useState, useEffect } from "react";


export const TogglesContext = createContext({
    isAddChild: null,
    setIsAddChild: () => null,
    isUpdateChild: null,
    setIsUpdateChild: () => null,
    dConfirmation: null,
    setDConfirmation: () => null,
    isAddCadre: null,
    setIsAddCadre: () => null,
    isUpdateCadre: null,
    setIsUpdateCadre: () => null,
    dConfirmationCadre: null,
    setDConfirmationCadre: () => null,
})


export const TogglesProvider = ({ children }) => {

    const [dConfirmation, setDConfirmation] = useState(false);
    const [isAddChild, setIsAddChild] = useState(false);
    const [isUpdateChild, setIsUpdateChild] = useState(false);
    const [isAddCadre, setIsAddCadre] = useState(false);
    const [isUpdateCadre, setIsUpdateCadre] = useState(false);
    const [dConfirmationCadre, setDConfirmationCadre] = useState(false);

    const value = { dConfirmation, setDConfirmation, isAddChild, setIsAddChild, isUpdateChild, setIsUpdateChild, isAddCadre, setIsAddCadre, isUpdateCadre, setIsUpdateCadre, dConfirmationCadre, setDConfirmationCadre };

    return <TogglesContext.Provider value={value} >{children}</TogglesContext.Provider>

}