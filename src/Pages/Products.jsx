import React from 'react';

import FilterSection from '../Components/FilterSection';
import ProductList from '../Components/ProductList';
import Sort from '../Components/Sort';

import { useProductContext } from '../Context/ProductContext';

import "../SCSS/Products.scss";
import Loading from '../Helpers/Loading';

const Products = () => {

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
        <Sort />

        <ProductList />
      </div>

    </div>
  )
}

export default Products;