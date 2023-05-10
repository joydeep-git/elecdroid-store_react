import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProductContext } from '../Context/ProductContext';
import HomeNavigation from '../Components/HomeNavigation';
import MyImage from '../Components/MyImage';
import FormatPrice from '../Helpers/FormatPrice';

import "../SCSS/SingleProduct.scss";

import { TbTruckDelivery, TbReplaceFilled, TbShieldCheckeredFilled } from "react-icons/tb";

const API = "https://api.pujakaitem.com/api/products";

const SingleProduct = () => {

    const { getSingleProduct, isSingleLoading, singleProduct } = useProductContext();

    const { id } = useParams();

    const { name, company, price, description, image, category, stock, reviews, stars } = singleProduct;

    useEffect(() => {

        getSingleProduct(`${API}?id=${id}`);

    }, []);

    return (
        <div className='SingleProduct'>

            <HomeNavigation name={name} link={"/"} linkName="HOME" />

            <div className="container">

                <div className='productImage'>
                    <MyImage image={image} />
                </div>

                <div className="productData">

                    <h2 className='name'>{name}</h2>

                    <p className='review'>{reviews} review</p>

                    <p className='rating'>rating:&nbsp;<span>{stars} stars</span></p>

                    <p className='highMrp'>
                        MRP: &nbsp;
                        <span>
                            <FormatPrice price={price + 250000} />
                        </span>
                    </p>

                    <p className='lowMrp'>Deal of the day: <span>
                        {<FormatPrice price={price} />}</span></p>

                    <p className='description'>{description}</p>

                    <div className='deliveryData'>

                        <div className="part">
                            <TbTruckDelivery className='icon' />
                            <p>Free delivery</p>
                        </div>

                        <div className="part">
                            <TbReplaceFilled className='icon' />
                            <p>Easy replacement</p>
                        </div>

                        <div className="part">
                            <TbShieldCheckeredFilled className='icon' />
                            <p>2 years warrenty</p>
                        </div>

                    </div>

                    <p className='available'>Available: <span>{stock > 0 ? "In stock" : "Not available"}</span></p>

                    <p className='category'>category: <span>{category}</span></p>

                    <p className='brand'>Brand: <span>{company}</span></p>


                </div>

            </div>

        </div>
    )
}

export default SingleProduct;