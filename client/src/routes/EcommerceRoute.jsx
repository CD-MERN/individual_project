import React, { useContext } from 'react';
import { Outlet } from "react-router-dom";
import { IconsContextProvider } from "../contexts/IconsContext";
import { UserContext } from '../contexts/UserContext.js'

const EcommerceRoute = ({ children, ...rest }) => {



    // const { user } = useContext(UserContext);
    // console.log(user);


    return (
        <>
            <IconsContextProvider>
                <Outlet />
            </IconsContextProvider>
        </>
    )
}

export default EcommerceRoute