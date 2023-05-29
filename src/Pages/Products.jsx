import React from 'react';

import FilterSection from '../Components/FilterSection';
import ProductList from '../Components/ProductList';
import Sort from '../Components/Sort';

import { RxCross2 } from "react-icons/rx";

import { useFilterContext } from '../Context/filter_context';

import { useProductContext } from '../Context/ProductContext';

import "../SCSS/Products.scss";
import Loading from '../Helpers/Loading';

const Products = () => {

  const { filter, setFilter } = useFilterContext();

  const { isLoading } = useProductContext();

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="Products">

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
              <button onClick={() => setFilter(!filter)} className='close-filter' > CLOSE </button>
            </div>
            : null
        }

        <div className='scrollableSection'>
          <ProductList />
        </div>
      </div>
    </div>

  )
}

export default Products;