import React from 'react';

import { useFilterContext } from '../Context/filter_context';

import "../SCSS/Sort.scss";

const Sort = () => {

    const { filter_products, sorting } = useFilterContext();

    return (
        <div className='Sort'>

            <div className='totalProducts'>
                {filter_products.length} Products
            </div>

            <div className='itemSort'>
                <select name="sort" id="sort" onClick={sorting}>
                    <option value="default">Default</option>
                    <option value="lowest">Price: Low to High</option>
                    <option value="highest">Price: High to Low</option>
                    <option value="a-z">Name: A - Z</option>
                    <option value="z-a">Name: Z - A</option>
                </select>
            </div>
        </div>
    )
}

export default Sort;