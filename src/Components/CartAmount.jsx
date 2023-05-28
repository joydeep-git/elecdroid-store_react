import React from 'react';
import { FaPlus, FaMinus } from "react-icons/fa";

import "../SCSS/CartAmount.scss";

const CartAmount = ({ amount, setIncrease, setDecrease }) => {
    return (
        <div className='CartAmount'>

            <button onClick={setDecrease} className='control'>
                <FaMinus className='icon' />
            </button>

            <span className='amount'>{amount}</span>

            <button onClick={setIncrease} className='control' >
                <FaPlus className='icon' />
            </button>

        </div>
    )
}

export default CartAmount;