import React, { createContext, useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate, Navigate } from "react-router-dom";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUserIsLogged = async () => {
            await axios.get('http://localhost:8000/api/is-logged', { withCredentials: true })
                .then((response) => {

                    setUser(response.data.currentUser)
                    setLoading(false);

                })
                .catch((error) => console.log("Error", error));

        }

        checkUserIsLogged();
    }, []);


    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    return (
        user ? <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider> : <Navigate to="/" />
    );
};

export { UserContext, UserContextProvider };
