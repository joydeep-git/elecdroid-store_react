import axios from 'axios';
import React, { createContext, useEffect, useReducer, useContext } from 'react';
import reducer from "../Reducer/ProductReducer";

const AppContext = createContext();

const API = "https://api.pujakaitem.com/api/products";

const initialState = {

    isLoading: false,

    isError: true,

    products: [],

    featureProducts: [],

    isSingleLoading: false,

    singleProduct: {},
}

const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const getProducts = async (url) => {

        dispatch({ type: "SET_LOADING" });

        try {
            const res = await axios.get(url);

            const products = await res.data;

            dispatch({ type: "MY_API_DATA", payload: products });

        } catch (error) {

            dispatch({ type: "API_ERROR" });

        }
    }

    const getSingleProduct = async (url) => {

        dispatch({ type: "SET_SINGLE_LOADING" });

        try {

            const res = await axios.get(url);

            const singleProduct = await res.data;

            dispatch( { type: "SET_SINGLE_PRODUCT", payload: singleProduct } )

        } catch (error) {
            dispatch({type: "SET_SINGLE_ERROR",})
        }
    }

    useEffect(() => {

        getProducts(API);

    }, [])

    return (
        <AppContext.Provider value={{ ...state, getSingleProduct }}>
            {children}
        </AppContext.Provider>
    )
};

const useProductContext = () => {
    return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };