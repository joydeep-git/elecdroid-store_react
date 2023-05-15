import React from 'react';
import { useFilterContext } from '../Context/filter_context';
import { Link } from 'react-router-dom';
import FormatPrice from '../Helpers/FormatPrice';

import "../SCSS/ProductList.scss";

const ProductList = () => {

    const { filter_products } = useFilterContext();

    return (
        <div className='ProductList'>
            {filter_products.map((item) => {
                const { id, name, image, price, category } = item;
                return (
                    <Link to={`/singleproduct/${id}`} className='products' key={id}>
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
            })}
        </div>
    )
}

export default ProductList;