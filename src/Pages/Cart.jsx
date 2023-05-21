import React from 'react';
import { useCartContext } from '../Context/cartContext';

const Cart = () => {

    const { cart } = useCartContext();

    return (
        <div className='Cart'>
            
        </div>
    )
}

export default Cart;