const cartReducer = (state, action) => {

    if (action.type === "ADD_TO_CART") {
        const { id, amount , product , pickColor } = action.payload;

        console.log( "product --", product);

        console.log( "color --", pickColor);

    }




    return state;
}

export default cartReducer;
