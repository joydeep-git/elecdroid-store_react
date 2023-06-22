import { createContext, useContext, useEffect, useReducer, useState } from "react";

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
        color: "all",
    }
}

export const FilterContextProvider = ({ children }) => {

    const [authenticated, setAuthenticated] = useState(false);

    const [profileData, setProfileData] = useState();

    const { products } = useProductContext();

    const [state, dispatch] = useReducer(reducer, initialState);

    const [filter, setFilter] = useState(false);

    const sorting = () => {
        dispatch({ type: "GET_SORT_VALUE", })
    }

    const updateFilterValue = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } })
    }

    const clearFilters = () => {
        dispatch({ type: "CLEAR_FILTERS" });
    }

    useEffect(() => {
        dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products })
    }, [products]);

    useEffect(() => {
        dispatch({ type: "SORTING_AND_FILTERING_PRODUCTS" });
    }, [products, state.sorting_value, state.filters]);

    return (
        <FilterContext.Provider value={{
            ...state, sorting, updateFilterValue, clearFilters, filter, setFilter, authenticated, setAuthenticated, profileData, setProfileData
        }}>
            {children}
        </FilterContext.Provider>
    )

}

export const useFilterContext = () => {
    return useContext(FilterContext);
}