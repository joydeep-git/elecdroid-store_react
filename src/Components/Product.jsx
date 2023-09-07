import React from 'react';
import { Link } from 'react-router-dom';

import FormatPrice from '../Helpers/FormatPrice';

import "../SCSS/Product.scss";

const Product = ({ ...item }) => {

    const { id, name, image, price,
        // category 
    } = item;

    return (
        <Link to={`/singleproduct/${id}`} className='Product'>

            <figure className='figure'>
                <img src={image} alt={name} />
                {/* <figcaption className='fig1'>{category}</figcaption> */}
                <figcaption className='fig2'><FormatPrice price={price} /></figcaption>
            </figure>

            <div className='cardData'>
                <p>{name}</p>
                {/* <p><FormatPrice price={price} /></p> */}
            </div>

        </Link>
    )
}

export default Product;