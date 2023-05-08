import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { HiOutlineMenuAlt4, HiX } from "react-icons/hi";

import "../SCSS/Header.scss";

import { FiShoppingCart } from "react-icons/fi";
import Badge from '@mui/material/Badge';

const Header = () => {

    const [menu, setMenu] = useState(false);

    const closeMenu = () => {
        setMenu(!menu);
    }

    return (
        <div className='Header'>

            <Link to="/" className='logo' >
                <span className='elec'>Elec</span>
                <span className='droid'>Droid</span>
            </Link>

            <div className='menu' onClick={() => setMenu(!menu)}>
                {menu ? <HiX /> : <HiOutlineMenuAlt4 />}
            </div>

            <div className='navList' id={menu ? "open" : ""}>

                <div className='nav'>
                    <Link to="/products" className='Link' onClick={closeMenu}>Products</Link>
                    <Link to="/about" className='Link' onClick={closeMenu}>About</Link>
                    <Link to="/contact" className='Link' onClick={closeMenu}>Contact</Link>
                </div>

                <button className='login' onClick={closeMenu}>
                    Login
                </button>

                <Link to="/cart" className='cart' onClick={closeMenu}>
                    <Badge badgeContent={4} color="primary">
                        <FiShoppingCart className='cart-icon' />
                    </Badge>
                </Link>

            </div>
        </div>
    )
}

export default Header;