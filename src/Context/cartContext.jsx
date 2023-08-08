import { createContext, useReducer, useContext, useEffect } from "react";

import reducer from "../Reducer/cartReducer";

import { useFirebaseContext } from "./FirebaseContext";

const cartContext = createContext();

const CartProvider = ({ children }) => {

    const { userCartData, setUserCartData, authenticated, setError } = useFirebaseContext();

    let initialState = {
        cart: userCartData || [],
        total_item: "",
        total_price: "",
        shipping_fee: 8000,
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const addToCart = (id, amount, pickColor, product) => {
        if (authenticated) {
            dispatch({ type: "ADD_TO_CART", payload: { id, amount, pickColor, product } });
        } else {
            setError("User is not authenticated. Cannot add to cart.");
        }
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
        dispatch({ type: "CART_TOTAL_PRICE" });
    }, [state.cart]);

    useEffect(() => {
        if (userCartData) {
            dispatch({ type: "LOAD_CART_DATA", payload: userCartData });
        }
    }, [userCartData]);

    useEffect(() => {
        setUserCartData(state.cart);
    }, [state.cart, setUserCartData]);

    return (
        <cartContext.Provider value={{ ...state, addToCart, removeItem, clearCart, setIncrement, setDecrement }}>
            {children}
        </cartContext.Provider>);
};

const useCartContext = () => {
    return useContext(cartContext);
}

export { CartProvider, useCartContext };