import { useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthContextProvider"
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({children}) => {
    const {isAuthenticated} = useContext(AuthContext);
    const location = useLocation();
    useEffect(() => {
        console.log(location);
    }, [location]);

    if(!isAuthenticated) {
        return <Navigate to='/login'/>;
    }
    return children;
}