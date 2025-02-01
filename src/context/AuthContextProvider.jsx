import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const naviagte = useNavigate();
    const location = useLocation();

    useEffect(() => {
        
    }, [token, location]);

    const login = (authToken, id) => {
        setIsAuthenticated(true);
        setToken(authToken);
        setUserId(id);
        naviagte('/quiz');
    }

    const logout = () => {
        setToken(null);
        setIsAuthenticated(false);
        setUserId(null);
        naviagte('/');
    }

    

    return (
        <AuthContext.Provider value={{token, isAuthenticated, login, logout, userId}}>
            {children}
        </AuthContext.Provider>
    )
}