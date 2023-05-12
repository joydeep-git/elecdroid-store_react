import React from 'react';
import { Link } from 'react-router-dom';
import FormatPrice from '../Helpers/FormatPrice';
import "../SCSS/AllProducts.scss";

const AllProducts = ({ ...item }) => {

    const { id, name, image, price, category } = item;

    return (
        <Link to={`/singleproduct/${id}`} className='AllProducts'>
            <figure className='figure'>
                <img src={image} alt={name} />
                <figcaption>{category}</figcaption>
            </figure>

            <div className='cardData'>
                <p>{name}</p>
                <p><FormatPrice price={price} /></p>
            </div>
        </Link>
    )
}

export default AllProducts;