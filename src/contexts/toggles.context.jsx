import { createContext, useState, useEffect } from "react";


export const TogglesContext = createContext({
    dConfirmation: null,
    setDConfirmation: () => null,
})


export const TogglesProvider = ({ children }) => {

    const [dConfirmation, setDConfirmation] = useState(false);



    const value = { dConfirmation, setDConfirmation };

    return <TogglesContext.Provider value={value} >{children}</TogglesContext.Provider>

}