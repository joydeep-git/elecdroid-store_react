const cartReducer = (state, action) => {

    if (action.type === "ADD_TO_CART") {
        let { id, amount , product , pickColor } = action.payload;

        let cartProduct;

        cartProduct = {
            id: id + pickColor,
            name: product.name,
            image: product.image[0].url,
            pickColor,
            amount,
            price: product.price,
            max: product.stock,
        }

        return{
            ...state,
            cart: [ ...state.cart, cartProduct ]
        }

    }

    return state;
}

export default cartReducer;
