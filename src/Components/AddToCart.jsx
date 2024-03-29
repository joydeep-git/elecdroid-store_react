import React, { useState } from 'react';
import { useCartContext } from '../Context/cartContext';
import { useFirebaseContext } from '../Context/FirebaseContext';

import { GrFormCheckmark } from 'react-icons/gr';

import "../SCSS/AddToCart.scss";
import CartAmount from './CartAmount';

const AddToCart = ({ product }) => {

    const { addToCart } = useCartContext();

    const { authenticated } = useFirebaseContext();

    const { id, colors, stock } = product;

    const [pickColor, setPickColor] = useState(colors[0]);

    const [amount, setAmount] = useState(1);

    const setIncrease = () => {
        amount < stock ? setAmount(amount + 1) : alert(`${stock} items are in stock, can't take more order.`)
    }

    const setDecrease = () => {
        amount > 1 ? setAmount(amount - 1) : alert("Quantity can not be 0.")
    }

    const handleAddToCart = () => {
        if (!authenticated) {
            alert("User is not authenticated");
        } else {
            addToCart(id, amount, pickColor, product);
        }
    }

    return (
        <div className="AddToCart">

            <div className='colors'>
                {
                    colors.map((color, index) => {

                        return (

                            <div
                                style={{ backgroundColor: color }}
                                className="color"
                                key={index} onClick={() => setPickColor(colors[index])} >

                                {pickColor === color ? <GrFormCheckmark style={{ backgroundColor: 'white', fontSize: "0.8rem", }} /> : null}

                            </div>
                        )
                    })
                }
            </div>

            <div className='cart-handle'>
                <CartAmount amount={amount} setIncrease={setIncrease} setDecrease={setDecrease} />
            </div>

            <div className='addtocart'>
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>

        </div>
    )
}

export default AddToCart;