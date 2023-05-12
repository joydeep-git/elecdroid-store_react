import React from 'react';

import FilterSection from '../Components/FilterSection';
import ProductList from '../Components/ProductList';
import Sort from '../Components/Sort';
// import { useFilterContext } from '../Context/filter_context';

import "../SCSS/Products.scss";

const Products = () => {

  // const { filter_products } = useFilterContext();

  return (
    <div className="Products">

      <div className='leftSection'>
        <FilterSection />
      </div>

      <div className='rightSection'>
        <Sort />

        <ProductList />
      </div>

    </div>
  )
}

export default Products;