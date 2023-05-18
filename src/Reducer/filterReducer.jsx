const filterReducer = (state, action) => {
    switch (action.type) {
        case "LOAD_FILTER_PRODUCTS":
            return {
                ...state,
                filter_products: [...action.payload],
                all_products: [...action.payload],
            };

        case "GET_SORT_VALUE":
            const userSortValue = document.getElementById("sort");
            const sort_value = userSortValue.options[userSortValue.selectedIndex].value;

            return {
                ...state,
                sorting_value: sort_value,
            };

        case "UPDATE_FILTERS_VALUE":
            const { name, value } = action.payload;

            return {
                ...state,
                filters: {
                    ...state.filters,
                    [name]: value,
                },
            };

        case "SORTING_AND_FILTERING_PRODUCTS":
            const { all_products } = state;
            const { text, category, company, color } = state.filters;

            let tempFilterProduct = all_products;

            if (text) {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.name.toLowerCase().includes(text.toLowerCase());
                });
            }

            if (category && category !== "all") {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.category === category;
                });
            }

            if (company && company !== "all") {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.company === company
                })
            }

            if (color && color !== "all") {
                tempFilterProduct = tempFilterProduct.filter((curColor) => {
                    return curColor.colors.includes(color);
                })
            }

            let newSortData;
            let tempSortProduct = [...tempFilterProduct];

            if (state.sorting_value === "default") {
                newSortData = [...tempFilterProduct];
            } else if (state.sorting_value === "lowest") {
                function sortingProducts(a, b) {
                    return a.price - b.price;
                }
                newSortData = tempSortProduct.sort(sortingProducts);
            } else if (state.sorting_value === "highest") {
                function sortingProducts(a, b) {
                    return b.price - a.price;
                }
                newSortData = tempSortProduct.sort(sortingProducts);
            } else if (state.sorting_value === "a-z") {
                newSortData = tempSortProduct.sort((a, b) => a.name.localeCompare(b.name));
            } else if (state.sorting_value === "z-a") {
                newSortData = tempSortProduct.sort((a, b) => b.name.localeCompare(a.name));
            }

            return {
                ...state,
                filter_products: newSortData,
            };

        case "CLEAR_FILTERS":
            return {
                ...state,
                filters: {
                    ...state.filters,
                    text: "",
                    category: "all",
                    company: "all",
                    color: "all",
                }
            }

        default:
            return state;
    }
};

export default filterReducer;