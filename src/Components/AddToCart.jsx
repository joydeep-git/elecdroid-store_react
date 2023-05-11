import React from 'react';

const AddToCart = ( {product} ) => {

    const { id, colors, stock } = product;

    console.log(id);

    return (
        <div>AddToCart</div>
    )
}

export default AddToCart;