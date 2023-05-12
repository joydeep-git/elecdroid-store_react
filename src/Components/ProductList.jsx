import React from 'react';
import { useFilterContext } from '../Context/filter_context';
import AllProducts from './AllProducts';

import "../SCSS/ProductList.scss";

const ProductList = () => {

    const { filter_products } = useFilterContext();

    return (
        <div className='ProductList'>
            { filter_products.map( (item) => {
                return <AllProducts key={item.id} {...item} />
            }) }
        </div>
    )
}

export default ProductList;