import { createContext, useState, useEffect } from "react";
import config from "../config";

export const AuthContext = createContext({
    isAuth: null,
    setIsAuth: () => null,
    logout: () => null,
    accessToken: null,
    setAccessToken: () => null,
    refreshToken: null,
    setRefreshToken: () => null,
    userData: null,
    setUserData: () => null
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
        localStorage.removeItem('userData');
        setIsAuth(false);
    };

    const fetchToken = async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await fetch(config.BASE_URL + 'api/Account/RefreshToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    RefreshToken: refreshToken,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const res = await response.json();

            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);

            console.log('Token refreshed successfully from cadres', res.data.refreshToken);

        } catch (error) {
            console.error('Error fetching token:', error);
        }
    };


    const fetchUserData = async () => {

        try {
            await fetchToken();
            const token = localStorage.getItem('accessToken');
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            };

            const response = await fetch(config.BASE_URL + "api/Account/userdetails", { headers });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            console.log('user data', jsonData.data);
            localStorage.setItem('userData', JSON.stringify(jsonData.data));
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        if (isAuth) {
            fetchUserData();
        }
    }, [isAuth])


    const value = { isAuth, setIsAuth, logout };

    return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>

}