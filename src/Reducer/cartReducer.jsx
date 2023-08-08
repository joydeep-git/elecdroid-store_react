const cartReducer = (state, action) => {

    if (action.type === "ADD_TO_CART") {
        let { id, amount, product, pickColor } = action.payload;

        let existingProduct = state.cart.find((curItem) => curItem.id === id + pickColor);

        if (existingProduct) {
            const updatedProduct = state.cart.map((curElem) => {
                if (curElem.id === id + pickColor) {
                    let newAmount = curElem.amount + amount;

                    if (newAmount > curElem.max) {
                        newAmount = curElem.max;
                    }

                    return {
                        ...curElem,
                        amount: newAmount,
                    };
                } else {
                    return curElem;
                }
            });
            return {
                ...state,
                cart: updatedProduct,
            };
        } else {
            let cartProduct = {
                id: id + pickColor,
                name: product.name,
                image: product.image[0].url,
                pickColor,
                amount,
                price: product.price,
                max: product.stock,
            };

            return {
                ...state,
                cart: [...state.cart, cartProduct],
            };
        }
    }

    if (action.type === "REMOVE_ITEM") {
        let updatedCart = state.cart.filter((curElem) => {
            return (curElem.id !== action.payload)
        })

        return {
            ...state,
            cart: updatedCart
        }
    }

    if (action.type === "CLEAR_CART") {
        return {
            ...state,
            cart: [],
        }
    }

    if (action.type === "SET_DECREMENT") {

        let updatedCart = state.cart.map((curElem) => {
            if (curElem.id === action.payload) {
                let decAmount = curElem.amount - 1;

                if (decAmount < 1) {
                    decAmount = 1;
                    alert(`Amount can not be less than 1`)
                }

                return {
                    ...curElem,
                    amount: decAmount,
                }
            } else {
                return curElem;
            }
        })
        return {
            ...state,
            cart: updatedCart,
        }
    }

    if (action.type === "SET_INCREMENT") {

        let updatedCart = state.cart.map((curElem) => {

            if (curElem.id === action.payload) {
                let incAmount = curElem.amount + 1;

                if (incAmount > curElem.max) {
                    incAmount = curElem.max;
                    alert(`${curElem.max} items are in stock, can't add more`)
                }

                return {
                    ...curElem,
                    amount: incAmount,
                }
            } else {
                return curElem;
            }
        })
        return {
            ...state,
            cart: updatedCart,
        }
    }

    if (action.type === "CART_TOTAL_ITEM") {
        let updateItemVal = state.cart.reduce((initialVal, curElem) => {
            let { amount } = curElem;
            initialVal = initialVal + amount;

            return initialVal;

        }, 0);
        return {
            ...state,
            total_item: updateItemVal,
        }
    }

    if (action.type === "CART_TOTAL_PRICE") {
        let total_amount = state.cart.reduce((initialVal, curElem) => {
            let { price, amount } = curElem;

            initialVal = initialVal + price * amount;

            return initialVal;
        }, 0);
        return {
            ...state,
            total_price: total_amount,
        }
    }

    if (action.type === "LOAD_CART_DATA") {
        return {
            ...state,
            cart: action.payload,
        };
    }

    return state;
}

export default cartReducer;
