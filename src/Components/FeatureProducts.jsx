import React from 'react';

import { useProductContext } from '../Context/ProductContext';

const FeatureProducts = () => {

    const { isLoading, featureProducts } = useProductContext() ;

    return (
        <div className='FeatureProducts'>

        </div>
    )
}

export default FeatureProducts;