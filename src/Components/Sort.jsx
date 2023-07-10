import React from 'react';

import { useFilterContext } from '../Context/filter_context';

import "../SCSS/Sort.scss";

const Sort = () => {

    const { filter_products, sorting, filter, setFilter } = useFilterContext();

    return (
        <div className='Sort'>

            <div className='filters'>
                <button onClick={() => setFilter(!filter)}>Filter Products</button>
            </div>

            <div className='totalProducts'>
                {filter_products.length} Products
            </div>

            <div className='itemSort'>
                <select name="sort" id="sort" onChange={sorting}>
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
