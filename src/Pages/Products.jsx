import React from 'react';

import FilterSection from '../Components/FilterSection';
import Product from '../Components/Product';
import Sort from '../Components/Sort';

import { useFilterContext } from '../Context/filter_context';

import { useProductContext } from '../Context/ProductContext';

import "../SCSS/Products.scss";
import Loading from '../Helpers/Loading';

const Products = () => {

  const { filter, filter_products, updateFilterValue, filters: { text } } = useFilterContext();

  const { isLoading } = useProductContext();

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="Products">

      <div className="search">
        <input
          type="text"
          name="text"
          value={text}
          placeholder='Search'
          onChange={updateFilterValue} />
      </div>

      <div className='product'>
        
        <div className='leftSection'>
          <FilterSection />
        </div>

        <div className='rightSection'>

          <div className='fixedSection'>
            <Sort />
          </div>

          {
            filter
              ?
              <div className='filter-section' id='filter-section'>
                <FilterSection />
              </div>
              : null
          }

          <div className='scrollableSection'>
            {
              filter_products.map((item) => {
                return <Product key={item.id} {...item} />
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products;