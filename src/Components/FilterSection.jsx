import React from 'react';

import "../SCSS/FilterSection.scss";
import { useFilterContext } from '../Context/filter_context';

const FilterSection = () => {

    const { filters: { text }, updateFilterValue, all_products } = useFilterContext();

    const uniqueCategory = (data, property) => {
        let newVal = data.map((e) => e[property]);
        return newVal = ["all", ...new Set(newVal)];
    }

    const categoryOnlyData = uniqueCategory(all_products, "category");

    const companyOnlyData = uniqueCategory(all_products, "company");

    return (
        <div className='FilterSection'>

            <div className="search">
                <form>
                    <input
                        type="text"
                        name="text"
                        value={text}
                        placeholder='Search'
                        onChange={updateFilterValue} />
                </form>
            </div>

            <div className="category">
                <h3>Category</h3>
                {categoryOnlyData.map((item, index) => {
                    return (
                        <button
                            key={index}
                            name='category'
                            value={item}
                            onClick={updateFilterValue} >{item}</button>
                    )
                })}
            </div>

            <div className="company">
                <h3>Company</h3>
                <select name="company" id="company">
                    {
                        companyOnlyData.map((company, index) => {
                            return (
                                <option value={company} name="company" key={index} >{company}</option>
                            )
                        })
                    }
                </select>
            </div>

        </div>
    )
}

export default FilterSection;