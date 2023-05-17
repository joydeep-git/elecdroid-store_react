import { createContext, useContext, useEffect, useReducer } from "react";

import { useProductContext } from "./ProductContext";

import reducer from "../Reducer/filterReducer";

const FilterContext = createContext();

const initialState = {
    filter_products: [],
    all_products: [],
    sorting_value: "default",
    filters: {
        text: "",
        category: "all",
        company: "all",
    }
}

export const FilterContextProvider = ({ children }) => {

    const { products } = useProductContext();

    const [state, dispatch] = useReducer(reducer, initialState);

    const sorting = () => {
        dispatch({ type: "GET_SORT_VALUE", })
    }

    useEffect(() => {
        dispatch({ type: "SORTING_PRODUCTS", payload: products, });
    }, [products, state.sorting_value]);

    useEffect(() => {
        dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products })
    }, [products]);

    const updateFilterValue = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } })
    }

    useEffect(() => {
        dispatch({ type: "FILTER_PRODUCTS" });
    }, [state.filters])

    return (
        <FilterContext.Provider value={{ ...state, sorting, updateFilterValue }}>
            {children}
        </FilterContext.Provider>
    )

}

export const useFilterContext = () => {
    return useContext(FilterContext);
}