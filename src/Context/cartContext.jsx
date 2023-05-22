import { createContext, useReducer, useContext } from "react";

import reducer from "../Reducer/cartReducer";

const cartContext = createContext();

let initialState = {
    cart: [],
    total_item: "",
    total_amount: "",
    shipping_fee: 50000,
};

const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const addToCart = (id, amount, pickColor, product) => {
        dispatch({ type: "ADD_TO_CART", payload: { id, amount, pickColor, product } });
    };

    const removeItem = (id) => {
        dispatch({type: "REMOVE_ITEM", payload: id });
    }

    return (
        <cartContext.Provider value={{ ...state, addToCart, removeItem }}>
            {children}
        </cartContext.Provider>);
};

const useCartContext = () => {
    return useContext(cartContext);
}

export { CartProvider, useCartContext };