import React from 'react';
import { FaPlus, FaMinus } from "react-icons/fa";

const CartAmount = ({ amount, setIncrease, setDecrease }) => {
    return (
        <div className='CartAmount'>
            <div className='amountControl'>

                <button onClick={setDecrease}>
                    <FaMinus />
                </button>

                <span>{amount}</span>

                <button onClick={setIncrease}>
                    <FaPlus />
                </button>

            </div>
        </div>
    )
}

export default CartAmount;