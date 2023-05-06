import React from 'react';
import { TbTruckDelivery } from "react-icons/tb";
import { MdSecurity } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";

import "../SCSS/Services.scss";

const Services = () => {
    return (
        <div className="Services">

            <div className="service1">
                <div className='icon-holder'>
                    <TbTruckDelivery className='icon' />
                </div>
                <h3>Super fast and free delivery</h3>
            </div>

            <div className="service2">
                <div className="part1">
                    <div className="icon-holder">
                        <MdSecurity className='icon' />
                    </div>
                    <h3>Non-contact shipping</h3>
                </div>

                <div className="part2">
                    <div className="icon-holder">
                        <GiReceiveMoney className='icon' />
                    </div>
                    <h3>Money-back guarantee</h3>
                </div>
            </div>

            <div className="service3">
                <div className="icon-holder">
                    <RiSecurePaymentLine className='icon' />
                </div>
                <h3>Super secure payment services</h3>
            </div>

        </div>
    )
}

export default Services;