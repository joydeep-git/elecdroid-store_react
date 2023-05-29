import React from 'react';
import { useCartContext } from '../Context/cartContext';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { BsFillTrashFill } from 'react-icons/bs';

import FormatPrice from '../Helpers/FormatPrice';

import '../SCSS/Cart.scss';

const Cart = () => {
    const { isAuthenticated, user } = useAuth0();
    const { cart, clearCart, shipping_fee, total_price, removeItem, setIncrement, setDecrement } = useCartContext();

    return (
        <div className='Cart'>

            {cart.length > 0 ? (

                <div>

                    {isAuthenticated && (
                        <div className='user-data'>
                            <img src={user.picture} alt='' />
                            <h3>{user.name}</h3>
                        </div>
                    )}

                    <div className='cart-data'>
                        <table className='cart-table'>
                            <thead>
                                <tr className='cart-heading-row'>
                                    <th>Item</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Subtotal</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((curElem) => (
                                    <tr className='cart-item' key={curElem.id}>
                                        <td>
                                            <div className='part-1'>
                                                <div className='img'>
                                                    <img src={curElem.image} alt={curElem.name} />
                                                </div>
                                                <div className='text'>
                                                    <h4>{curElem.name}</h4>
                                                    <p>
                                                        Color: <button style={{ backgroundColor: curElem.pickColor }}></button>
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <FormatPrice price={curElem.price} />
                                        </td>
                                        <td>
                                            <div className='quantity'>
                                                <p>Quantity: {curElem.amount}</p>
                                                <div className='btn'>
                                                    <button onClick={() => setIncrement(curElem.id)}  >+</button>
                                                    <button onClick={() => setDecrement(curElem.id)} >-</button>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <FormatPrice price={curElem.price * curElem.amount} />
                                        </td>
                                        <td>
                                            <BsFillTrashFill className='remove-icon' onClick={() => removeItem(curElem.id)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className='btns'>
                        <Link to='/products'>
                            <button>Continue shopping</button>
                        </Link>
                        <button onClick={clearCart}>Clear Cart</button>
                    </div>

                    <div className='total-price'>
                        <div>
                            <p>Subtotal:</p>
                            <p>
                                <FormatPrice price={total_price} />
                            </p>
                        </div>

                        <div>
                            <p>Shipping fees:</p>
                            <p>
                                <FormatPrice price={shipping_fee} />
                            </p>
                        </div>

                        <hr />

                        <div>
                            <p>Total price: </p>
                            <p>
                                <FormatPrice price={total_price + shipping_fee} />
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <p className='no-item'>
                    No item in cart, <Link to='/products'>Continue shopping</Link>
                </p>
            )}
        </div>
    );
};

export default Cart;
