import React from 'react';

import "../SCSS/FilterSection.scss";
import { useFilterContext } from '../Context/filter_context';

const FilterSection = () => {

    const { filters: { text }, updateFilterValue, all_products } = useFilterContext();

    const uniqueCategory = (data, property) => {

        let newVal = data.map((e) => e[property]);

        return newVal = ["All", ...new Set(newVal)];
    }

    const categoryOnlyData = uniqueCategory(all_products, "category");

    const companyOnlyData = uniqueCategory( all_products, "company");

    return (
        <div className='FilterSection'>
            <div className="search">
                <form onSubmit={(e) => e.preventDefault()}>
                    <input type="text" name='text' value={text} placeholder='Search' onChange={updateFilterValue} />
                </form>
            </div>
        </div>
    )
}

export default FilterSection;