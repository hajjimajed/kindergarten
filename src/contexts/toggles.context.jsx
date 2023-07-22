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
    isAddActivity: null,
    setIsAddActivity: () => null,
    isUpdateActivity: null,
    setIsUpdateActivity: () => null,
    dConfirmationActivity: null,
    setDConfirmationActivity: () => null,
    isAddProject: null,
    setIsAddProject: () => null,
    isUpdateProject: null,
    setIsUpdateProject: () => null,
    dConfirmationProject: null,
    setDConfirmationProject: () => null,
})


export const TogglesProvider = ({ children }) => {

    const [dConfirmation, setDConfirmation] = useState(false);
    const [isAddChild, setIsAddChild] = useState(false);
    const [isUpdateChild, setIsUpdateChild] = useState(false);

    const [isAddCadre, setIsAddCadre] = useState(false);
    const [isUpdateCadre, setIsUpdateCadre] = useState(false);
    const [dConfirmationCadre, setDConfirmationCadre] = useState(false);

    const [isAddActivity, setIsAddActivity] = useState(false);
    const [isUpdateActivity, setIsUpdateActivity] = useState(false);
    const [dConfirmationActivity, setDConfirmationActivity] = useState(false);

    const [isAddProject, setIsAddProject] = useState(false);
    const [isUpdateProject, setIsUpdateProject] = useState(false);
    const [dConfirmationProject, setDConfirmationProject] = useState(false);

    const value = {
        dConfirmation, setDConfirmation, isAddChild, setIsAddChild, isUpdateChild, setIsUpdateChild,
        isAddCadre, setIsAddCadre, isUpdateCadre, setIsUpdateCadre, dConfirmationCadre, setDConfirmationCadre,
        isAddActivity, setIsAddActivity, isUpdateActivity, setIsUpdateActivity, dConfirmationActivity, setDConfirmationActivity,
        isAddProject, setIsAddProject, isUpdateProject, setIsUpdateProject, dConfirmationProject, setDConfirmationProject
    };

    return <TogglesContext.Provider value={value} >{children}</TogglesContext.Provider>

}