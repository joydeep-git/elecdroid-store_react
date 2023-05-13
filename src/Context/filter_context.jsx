import { createContext, useContext, useEffect, useReducer } from "react";

import { useProductContext } from "./ProductContext";

import reducer from "../Reducer/filterReducer";

const FilterContext = createContext();

const initialState = {
    filter_products: [],
    all_products: [],
    sorting_value: "default",
}

export const FilterContextProvider = ({ children }) => {

    const { products } = useProductContext();

    const [state, dispatch] = useReducer(reducer, initialState);

    const sorting = () => {
        dispatch({ type: "GET_SORT_VALUE",})
    }

    useEffect(()=>{
        
    }, [state.sorting_value]);

    useEffect(() => {
        dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products })
    }, [ products ]);

    return (
        <FilterContext.Provider value={{ ...state, sorting }}>
            {children}
        </FilterContext.Provider>
    )

}

export const useFilterContext = () => {
    return useContext(FilterContext);
}