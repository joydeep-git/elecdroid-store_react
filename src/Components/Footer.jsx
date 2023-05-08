import React from 'react';
import { Link } from 'react-router-dom';

import { FiGithub, FiTwitter } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import {RiCopyrightLine} from "react-icons/ri";


const Footer = () => {
    return (
        <div className="Footer">

            <div className="part1">
                <h4>Ready to get started? <br /> Talk to us today</h4>
                <button>
                    <Link to="/contact">Get started</Link>
                </button>
            </div>

            <div className="part2">

                <div className="division1">
                    <h3>ElecDroid</h3>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi, quas!</p>
                </div>

                <div className="division2">
                    <p>Subscribe to get important contents.</p>
                    <input type="email" />
                    <button>SUBSCRIBE</button>
                </div>

                <div className="division3">
                    <p>Follow Us</p>
                    <div>
                        <a href="https://github.com/joydeep-git">
                            <FiGithub />
                        </a>

                        <a href="https://www.linkedin.com/in/joy-deepdas/">
                            <FaLinkedinIn />
                        </a>

                        <a href="https://twitter.com/joy_deep_19">
                            <FiTwitter />
                        </a>
                    </div>
                </div>

                <div className="division4">
                    <p>Call Us</p>
                    <p>+91 987456321</p>
                </div>

            </div>

            <div className="part3">

                <div>
                    <RiCopyrightLine />
                    ElecDroid all rights reserved.
                </div>

                <div>
                    <p>Privacy policy</p>
                    <p>TERMS & CONDITIONS</p>
                </div>

            </div>

        </div>
    )
}

export default Footer;