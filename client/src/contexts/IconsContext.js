import React, { createContext, useState, useEffect } from "react";
import axios from 'axios'

const IconsContext = createContext();

const IconsContextProvider = ({ children }) => {

    const [cart, setCart] = useState([]);
    const [wishList, setWishList] = useState(null);

    useEffect(() => {
        // Get the cart list from local storage
        const fetchCart = async () => {            
            // Si hay lista de productos añadidos al carrito
            if (localStorage.getItem("cartList")) {
                // Se utiliza json.parse para convertirlo en objeto de nuevo para utilizarlo con js
                setCart(JSON.parse(localStorage.getItem("cartList")));
            };
        }

        const fetchWishList = async () => {
            await axios.get('http://localhost:8000/api/wish-list', { withCredentials: true })
                .then((response) => {
                    setWishList(response.data.wishList)
                })
                .catch((error) => console.log("Error", error));
        }

        fetchCart();
        fetchWishList();
    }, []);




    return (
        <IconsContext.Provider value={{ cart, setCart, wishList, setWishList }}>
            {children}
        </IconsContext.Provider>
    );
};

export { IconsContext, IconsContextProvider };
