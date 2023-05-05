import React from 'react';
import { Link } from 'react-router-dom';

import "../SCSS/HeroSection.scss";

import familyShoppingImage from "../Images/family-shopping.jpg";

const HeroSection = ({ name }) => {
    return (
        <div className='HeroSection'>

            <div className='div'>
                <div className='heroText'>
                    <p>Welcome to</p>
                    <h1>{name}</h1>
                    <p>use coupone code "NEW2023" to get extra 5% off on products.</p>
                    <button>
                        <Link to="/products" className='button'>Shop Now</Link>
                    </button>
                </div>

                <div className='heroImage'>
                    <img src={familyShoppingImage} alt="Family Shopping" />
                </div>
            </div>

        </div>
    )
}

export default HeroSection;