import React, { useState } from 'react';
import "../SCSS/MyImage.scss";

const MyImage = ({ image = [{ url: "" }] }) => {

    const [mainImage, setMainImage] = useState(image[0]);

    return (
        <div className='MyImage'>
            <div className="allImages">
                {image.map((item, index) => {
                    return (
                        <img
                            src={item.url}
                            alt={item.filename}
                            className="img"
                            key={index}
                            onClick={() => setMainImage(item)}
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