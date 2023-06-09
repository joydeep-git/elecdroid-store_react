import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartContext } from '../Context/cartContext';

import { GrFormCheckmark } from 'react-icons/gr';

import "../SCSS/AddToCart.scss";
import CartAmount from './CartAmount';

const AddToCart = ({ product }) => {

    const { addToCart } = useCartContext();

    const { id, colors, stock } = product;

    const [pickColor, setPickColor] = useState(colors[0]);

    const [amount, setAmount] = useState(1);

    const setIncrease = () => {
        amount < stock ? setAmount(amount + 1) : alert(`${stock} items are in stock, can't take more order.`)
    }

    const setDecrease = () => {
        amount > 1 ? setAmount(amount - 1) : alert("Quantity can not be 0.")
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
                <Link to="/cart">
                    <button onClick={() => addToCart(id, amount, pickColor, product)}>Add to Cart</button></Link>
            </div>

        </div>
    )
}

export default AddToCart;