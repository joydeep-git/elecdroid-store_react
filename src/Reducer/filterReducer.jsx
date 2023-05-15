const filterReducer = (state, action) => {

    switch (action.type) {
        case "LOAD_FILTER_PRODUCTS":
            return {
                ...state,
                filter_products: [...action.payload],
                all_products: [...action.payload],
            }

        case "GET_SORT_VALUE":
            const userSortValue = document.getElementById("sort");
            const sort_value = userSortValue.options[userSortValue.selectedIndex].value;

            return {
                ...state,
                sorting_value: sort_value,
            }

        case "SORTING_PRODUCTS":
            let newSortData;
            let tempSortProduct = [...action.payload];

            if (state.sorting_value === "default") {
                newSortData = [...action.payload]
            }

            if (state.sorting_value === "lowest") {
                function sortingProducts(a, b) {
                    return a.price - b.price
                }
                newSortData = tempSortProduct.sort(sortingProducts);
            }

            if (state.sorting_value === "highest") {
                function sortingProducts(a, b) {
                    return b.price - a.price
                }
                newSortData = tempSortProduct.sort(sortingProducts);
            }

            if (state.sorting_value === "a-z") {
                newSortData = tempSortProduct.sort((a, b) => a.name.localeCompare(b.name))
            }

            if (state.sorting_value === "z-a") {
                newSortData = tempSortProduct.sort((a, b) => b.name.localeCompare(a.name))
            }

            return {
                ...state,
                filter_products: newSortData,
            }

        case "UPDATE_FILTERS_VALUE":
            const { name, value } = action.payload;

            return {
                ...state,
                filters: {
                    ...state.filters,
                    [name]: value,
                }
            }

        case "FILTER_PRODUCTS":
            const { all_products } = state;
            let tempFilterProduct = [...all_products];
            const { text } = state.filters;

            if (text) {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.name.toLowerCase().includes(text);
                });
            }

            return {
                ...state,
                filter_products: tempFilterProduct,
            }

        default:
            return state;
    }

}

export default filterReducer;