import React, { useState } from 'react';
import "../SCSS/MyImage.scss";

const MyImage = ({ image = [{ url: "" }] }) => {

    const [mainImage, setMainImage] = useState(image[0]);

    return (
        <div className='MyImage'>
            <div className="allImages">
                {image.map((curElm, index) => {
                    return (
                        <img
                            src={curElm.url}
                            alt={curElm.filename}
                            className="img"
                            key={index}
                            onClick={() => setMainImage(curElm)}
                        />
                    );
                })}
            </div>

            <div className="mainImage">
                <img src={mainImage.url} alt={mainImage.filename} className='mainImg' />
            </div>
        </div>
    )
}

export default MyImage;