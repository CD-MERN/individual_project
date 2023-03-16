import React, { useContext } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from '../contexts/UserContext.js'
const AdminRoute = ({ children, ...rest }) => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    if (!user || user.role !== 'admin') {
        navigate(-1)
    }

    return (
        <>
            <Outlet />
        </>
    )
}

export default AdminRoute