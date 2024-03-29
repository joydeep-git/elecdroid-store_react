import React from 'react';

import "../SCSS/FilterSection.scss";

import { useFilterContext } from '../Context/filter_context';

import { BsCheckLg } from "react-icons/bs";

const FilterSection = () => {

    const { filters: { category, color, company }, updateFilterValue, all_products, clearFilters, filter, setFilter } = useFilterContext();

    const uniqueCategory = (data, property) => {
        let newVal = data.map((e) => e[property]);

        if (property === "colors") {
            newVal = newVal.flat();
        }
        return newVal = ["all", ...new Set(newVal)];
    }

    const categoryOnlyData = uniqueCategory(all_products, "category");

    const companyOnlyData = uniqueCategory(all_products, "company");

    const colorOnlyData = uniqueCategory(all_products, "colors");

    return (
        <div className='FilterSection'>

            <div className="category">
                <h3>Category</h3>
                <div>
                    {categoryOnlyData.map((item, index) => {
                        const isActive = item === category ? 'active' : '';
                        return (
                            <button
                                key={index}
                                name='category'
                                value={item}
                                onClick={updateFilterValue}
                                className={isActive}>{item.toUpperCase()}</button>
                        )
                    })}
                </div>
            </div>

            <div className="company">
                <h3>Company</h3>
                <select name="company" id="company" onChange={updateFilterValue} value={company}> {/* Add 'value={company}' */}
                    {
                        companyOnlyData.map((company, index) => {
                            return (
                                <option value={company} name="company" key={index} className='company-options'>{company.toUpperCase()}
                                </option>
                            )
                        })
                    }
                </select>
            </div>

            <div className="colors">
                <h3>Colors</h3>
                <div className='color-div'>
                    {
                        colorOnlyData.map((curElem, index) => {
                            if (curElem === "all") {
                                return (
                                    <button
                                        className='all'
                                        name='color'
                                        value={curElem}
                                        style={{ background: 'transparent', border: "none" }}
                                        key={index}
                                        onClick={updateFilterValue} >
                                        {"all".toUpperCase()}
                                    </button>
                                )
                            } else {
                                return (
                                    <button
                                        className='color-btn'
                                        name='color'
                                        value={curElem}
                                        style={{ backgroundColor: curElem, }}
                                        key={index}
                                        onClick={updateFilterValue} >
                                        {
                                            color === curElem ? <BsCheckLg className='check-icon' /> : null
                                        }
                                    </button>
                                )
                            }
                        })
                    }
                </div>
            </div>

            <div className='clear-filter'>
                <button onClick={clearFilters}>clear filter</button>
            </div>

            <div className='closeBtn'>
                <button onClick={() => setFilter(!filter)} className='close-filter' > CLOSE </button>
            </div>
        </div>
    )
}

export default FilterSection;