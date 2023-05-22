import { createContext, useReducer, useContext, useEffect } from "react";

import reducer from "../Reducer/cartReducer";

const cartContext = createContext();

const getLocalCartData = () => {
    const localCartData = localStorage.getItem("elecdroidCart");
    return localCartData ? JSON.parse(localCartData) : [];
};

let initialState = {
    cart: getLocalCartData(),
    total_item: "",
    total_price: "",
    shipping_fee: 8000,
};

const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const addToCart = (id, amount, pickColor, product) => {
        dispatch({ type: "ADD_TO_CART", payload: { id, amount, pickColor, product } });
    };

    const removeItem = (id) => {
        dispatch({ type: "REMOVE_ITEM", payload: id });
    };

    const clearCart = (id) => {
        dispatch({ type: "CLEAR_CART", payload: id });
    };

    const setDecrement = (id) => {
        dispatch({ type: "SET_DECREMENT", payload: id });
    }

    const setIncrement = (id) => {
        dispatch({ type: "SET_INCREMENT", payload: id });
    }

    useEffect(() => {
        dispatch({ type: "CART_TOTAL_ITEM" });
        dispatch({type: "CART_TOTAL_PRICE"});
        localStorage.setItem("elecdroidCart", JSON.stringify(state.cart))
    }, [state.cart]);

    return (
        <cartContext.Provider value={{ ...state, addToCart, removeItem, clearCart, setIncrement, setDecrement }}>
            {children}
        </cartContext.Provider>);
};

const useCartContext = () => {
    return useContext(cartContext);
}

export { CartProvider, useCartContext };