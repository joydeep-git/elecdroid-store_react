import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { GrFormCheckmark } from 'react-icons/gr';

import "../SCSS/AddToCart.scss";
import CartAmount from './CartAmount';

const AddToCart = ({ product }) => {

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

            <div>
                <CartAmount amount={amount} setIncrease={setIncrease} setDecrease={setDecrease} />
            </div>

            <div>
                <button>
                    <Link to="/cart">Go to cart</Link>
                </button>
            </div>

        </div>
    )
}

export default AddToCart;