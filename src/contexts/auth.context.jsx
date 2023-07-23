import { createContext, useState, useEffect } from "react";


export const AuthContext = createContext({
    isAuth: null,
    setIsAuth: () => null,
    logout: () => null
})

export const AuthProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (accessToken && refreshToken) {
            setIsAuth(true);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsAuth(false);
    };


    const value = { isAuth, setIsAuth, logout };

    return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>

}