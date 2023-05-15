import { createContext, useContext, useEffect, useReducer } from "react";

import { useProductContext } from "./ProductContext";

import reducer from "../Reducer/filterReducer";

const FilterContext = createContext();

const initialState = {
    filter_products: [],
    all_products: [],
    sorting_value: "default",
    filters: {
        text: ""
    }
}

export const FilterContextProvider = ({ children }) => {

    const { products } = useProductContext();

    const [state, dispatch] = useReducer(reducer, initialState);

    const sorting = () => {
        dispatch({ type: "GET_SORT_VALUE", })
    }

    const updateFilterValue = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        return dispatch({type: "UPDATE_FILTERS_VALUE", payload: { name, value } })
    }

    useEffect(() => {
        dispatch({ type: "FILTER_PRODUCTS"  });
        dispatch({ type: "SORTING_PRODUCTS", payload: products,  });
    }, [products, state.sorting_value, state.filters]);

    useEffect(() => {
        dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products })
    }, [products]);

    return (
        <FilterContext.Provider value={{ ...state, sorting, updateFilterValue }}>
            {children}
        </FilterContext.Provider>
    )

}

export const useFilterContext = () => {
    return useContext(FilterContext);
}