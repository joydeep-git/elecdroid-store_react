import React from 'react';

import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

import "../SCSS/Stars.scss";

const Stars = ({ reviews, stars }) => {

    const starRating = Array.from( {length: 5 }, ( e, index) =>{

        let halfStar = index +0.5 ;

        return(
            <span key={index}>
                {
                    stars >= index +1 
                    ? <FaStar className='star' /> 
                    : stars >= halfStar ? <FaStarHalfAlt className='star' /> 
                    : <AiOutlineStar className='star' />
                }
            </span>
        )
    } )

    return (
        <div className="Stars">
            { starRating}
            <p>( {reviews} customer reviews )</p>
        </div>
    )
}

export default Stars;