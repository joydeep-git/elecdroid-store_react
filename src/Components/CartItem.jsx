import React from 'react';
import { BsFillTrashFill } from "react-icons/bs";

import "../SCSS/CartItem.scss";

import { useCartContext } from '../Context/cartContext';

import FormatPrice from '../Helpers/FormatPrice';
import CartAmount from './CartAmount';

const CartItem = ({ id, name, image, pickColor, amount, price }) => {

    const { removeItem } = useCartContext();

    const setIncrease = () => {
        // amount < stock ? setAmount(amount + 1) : alert(`${stock} items are in stock, can't take more order.`)
    }

    const setDecrease = () => {
        // amount > 1 ? setAmount(amount - 1) : alert("Quantity can not be 0.")
    }

    return (
        <div className='CartItem'>

            <div className='part-1'>
                <img src={image} alt={name} />
                <div>
                    <h4>{name}</h4>
                    <p>Color: <button style={{ backgroundColor: pickColor, }}></button></p>
                </div>
            </div>

            <div>
                <FormatPrice price={price} />
            </div>

            <div>
                <CartAmount amount={amount} setIncrease={setIncrease} setDecrease={setDecrease} />
            </div>

            <div>
                <FormatPrice price={price * amount} />
            </div>

            <div>
                <BsFillTrashFill className='remove-icon' onClick={() => removeItem(id)} />
            </div>

        </div>
    )
}

export default CartItem;