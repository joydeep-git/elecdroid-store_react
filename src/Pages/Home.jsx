import React from 'react';

import "../SCSS/Home.scss";
import HeroSection from '../Components/HeroSection';
import Services from '../Components/Services';

const Home = () => {
    return (
        <div>
            <HeroSection name={"ElecDroid Store"} />
            <Services />
        </div>
    )
}

export default Home;