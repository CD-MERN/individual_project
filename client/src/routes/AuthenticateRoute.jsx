
import { Outlet, Navigate } from "react-router-dom";
import { UserContextProvider } from "../contexts/UserContext.js";
const AuthenticateRoute = ({ children, ...rest }) => {
    return (
        <>
            <UserContextProvider>
                <Outlet />
            </UserContextProvider>
        </>
    )
}

export default AuthenticateRoute