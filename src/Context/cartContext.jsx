import { createContext, useReducer, useContext } from "react";

import reducer from "../Reducer/cartReducer";

const cartContext = createContext();

const initialState = [{
    cart: "",
    total_item: "",
    total_amount: "",
    shipping_fee: 50000,
}];

const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const addToCart = (id, name, colors, product) => {
        dispatch({type: "ADD_TO_CART", payload: { id, name, colors, product }});
    };

    return (
        <cartContext.Provider value={{ ...state, addToCart }}>
            {children}
        </cartContext.Provider>);
};

const useCartContext = () => {
    return useContext(cartContext);
}

export { CartProvider, useCartContext };