import React, { useState } from 'react';

import { GrFormCheckmark } from 'react-icons/gr';

import "../SCSS/AddToCart.scss";

const AddToCart = ({ product }) => {

    const { id, colors, stock } = product;

    const [pickColor, setPickColor] = useState(colors[0]);

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

        </div>
    )
}

export default AddToCart;