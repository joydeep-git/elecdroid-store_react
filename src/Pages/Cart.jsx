import React from 'react';
import { useCartContext } from '../Context/cartContext';
import "../SCSS/Cart.scss";
import { Link } from 'react-router-dom';

import CartItem from '../Components/CartItem';

const Cart = () => {

    const { cart } = useCartContext();

    return (
        <div className='Cart'>

            {
                cart.length > 0

                    ? <div className="cart">
                        <div className='cart-heading-row'>
                            <p>Item</p>
                            <p className='hide'>Price</p>
                            <p>Quantity</p>
                            <p className='hide'>Subtotal</p>
                            <p>Remove</p>
                        </div>

                        <hr />

                        <div className='cart-item'>
                            {
                                cart.map((curElem) => {
                                    return <CartItem key={curElem.id} {...curElem} />

                                })
                            }
                        </div>
                    </div>

                    : <p className='no-item'>No item in cart, <Link to="/products">Continue shopping</Link></p>
            }

        </div>
    )
}

export default Cart;