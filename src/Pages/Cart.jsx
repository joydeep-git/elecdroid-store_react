import React from 'react';
import { useCartContext } from '../Context/cartContext';
import "../SCSS/Cart.scss";
import { Link } from 'react-router-dom';

import CartItem from '../Components/CartItem';
import FormatPrice from '../Helpers/FormatPrice';

const Cart = () => {

    const { cart, clearCart, shipping_fee, total_price } = useCartContext();

    return (
        <div className='Cart'>

            {
                cart.length > 0

                    ?
                    <div>
                        <div className="cart">
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

                        <div>
                            <button><Link to="/products">Continue shopping</Link></button>
                            <button onClick={clearCart}>Clear Cart</button>
                        </div>

                        <div className='total-price'>

                            <div>
                                <p>Subtotal:</p>
                                <p><FormatPrice price={total_price} /></p>
                            </div>

                            <div>
                                <p>Shipping fees:</p>
                                <p><FormatPrice price={shipping_fee} /></p>
                            </div>

                            <hr />

                            <div>
                                <p>Total price: </p>
                                <p> <FormatPrice price={total_price + shipping_fee} /> </p>
                            </div>

                        </div>

                    </div>

                    :
                    <p className='no-item'>No item in cart, <Link to="/products">Continue shopping</Link></p>
            }

        </div>
    )
}

export default Cart;