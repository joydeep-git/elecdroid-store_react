import React from 'react';

import "../SCSS/FilterSection.scss";
import { useFilterContext } from '../Context/filter_context';

const FilterSection = () => {

    const { filters:{text}, updateFilterValue } = useFilterContext();
    return (
        <div className='FilterSection'>
            <div className="search">
                <form onSubmit={ (e) => e.preventDefault() }>
                    <input type="text" name='text' value={text} onChange={updateFilterValue}/>
                </form>
            </div>
        </div>
    )
}

export default FilterSection;