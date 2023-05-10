import React from 'react';
import Product from './Product';

import "../SCSS/FeatureProducts.scss";

import { useProductContext } from '../Context/ProductContext';

const FeatureProducts = () => {

    const { isLoading, featureProducts } = useProductContext();

    return (
        <>
            {
                isLoading
                    ? <div className='loading'>...Loading</div>
                    :
                    <div className='FeatureProducts'>
                        <div className='top-part'>
                            <p>Check now!</p>
                            <h3>Our feature products</h3>
                        </div>
                        <div className='feature-products'>
                            {
                                featureProducts.map( (item) => {
                                    return <Product  key={item.id} {...item} />
                                })
                            }
                        </div>
                    </div>
            }
        </>
    )
}

export default FeatureProducts;