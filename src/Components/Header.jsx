import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useCartContext } from '../Context/cartContext';
import { useFirebaseContext } from '../Context/FirebaseContext';

import { FiShoppingCart } from "react-icons/fi";
import { HiOutlineMenuAlt4, HiX } from "react-icons/hi";
import { FaUserAlt } from 'react-icons/fa';

import "../SCSS/Header.scss";

const Header = () => {

    const { authenticated, setAuthenticated, userSignOut } = useFirebaseContext();

    const { total_item } = useCartContext();

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
                    {
                        authenticated
                        ? <Link to="/profile" className='Link' onClick={closeMenu}> <FaUserAlt /></Link>
                        : null
                    }
                    <Link to="/products" className='Link' onClick={closeMenu}>Products</Link>
                    <Link to="/about" className='Link' onClick={closeMenu}>About</Link>
                    <Link to="/contact" className='Link' onClick={closeMenu}>Contact</Link>

                    {
                        !authenticated
                        ?
                        <Link to="/login" className='Link signup' onClick={closeMenu}>Login</Link>
                        :
                        <Link to="/login" className='Link signup' onClick={ () => {
                            closeMenu();
                            userSignOut();
                        }} >Log out</Link>
                    }

                </div>
                
                <Link to="/cart" className='cart' onClick={closeMenu}>
                    <Badge badgeContent={total_item} color="primary">
                        <FiShoppingCart className='cart-icon' />
                    </Badge>
                </Link>

            </div>
        </div>
    )
}

export default Header;