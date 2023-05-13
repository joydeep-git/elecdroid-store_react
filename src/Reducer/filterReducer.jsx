const filterReducer = ( state, action ) => {

    switch( action.type ){
        case "LOAD_FILTER_PRODUCTS" :
            return{
                ...state,
                filter_products: [ ...action.payload ],
                all_products: [ ...action.payload ],
            }

        case "GET_SORT_VALUE":
            const userSortValue = document.getElementById("sort");
            const sort_value = userSortValue.options[ userSortValue.selectedIndex].value;

            return{
                ...state,
                sorting_value: sort_value,
            }
            
        default:
            return state;
    }

}

export default filterReducer;