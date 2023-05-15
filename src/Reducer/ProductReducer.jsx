const ProductReducer = (state, action) => {

    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                isLoading: true,
            }

        case "MY_API_DATA":
            const featureData = action.payload.filter((e) => {
                return e.featured === true;
            })

            return {
                ...state,
                isLoading: false,
                products: action.payload,
                featureProducts: featureData,
            }

        case "API_ERROR":
            return {
                ...state,
                isLoading: false,
                isError: true,
            }

        case "SET_SINGLE_LOADING":
            return {
                ...state,
                isSingleLoading: true,
            }

        case "SET_SINGLE_PRODUCT":
            return {
                ...state,
                isSingleLoading: false,
                singleProduct: action.payload,
            }

        default:
            return state;
    }
};

export default ProductReducer;