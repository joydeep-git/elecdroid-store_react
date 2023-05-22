import React from 'react';
import { BsFillTrashFill } from "react-icons/bs";

import "../SCSS/CartItem.scss";

import { useCartContext } from '../Context/cartContext';

import FormatPrice from '../Helpers/FormatPrice';
import CartAmount from './CartAmount';

const CartItem = ({ id, name, image, pickColor, amount, price }) => {

    const { removeItem, setIncrement, setDecrement } = useCartContext();

    return (
        <>
            <div className='CartItem'>

                <div className='part-1'>

                    <div className='img'>
                        <img src={image} alt={name} />
                    </div>

                    <div className='text'>
                        <h4>{name}</h4>
                        <p>Color: <button style={{ backgroundColor: pickColor, }}></button></p>
                    </div>

                </div>

                <div>
                    <FormatPrice price={price} />
                </div>

                <div>
                    <CartAmount
                        amount={amount}
                        setIncrease={ () => setIncrement(id) }
                        setDecrease={ () => setDecrement(id) } />
                </div>

                <div>
                    <FormatPrice price={price * amount} />
                </div>

                <div>
                    <BsFillTrashFill className='remove-icon' onClick={() => removeItem(id)} />
                </div>

            </div>
            <hr />
        </>
    )
}

export default CartItem;