import React from 'react';

import "../SCSS/Home.scss";
import HeroSection from '../Components/HeroSection';
import Services from '../Components/Services';
import FeatureProducts from '../Components/FeatureProducts';

const Home = () => {
    return (
        <div>
            <HeroSection name={"ElecDroid Store"} />
            <FeatureProducts />
            <Services />
        </div>
    )
}

export default Home;