import React, { useState } from 'react';
import "../SCSS/Header.scss";
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useAuth0 } from '@auth0/auth0-react';
import { FiShoppingCart } from "react-icons/fi";
import { HiOutlineMenuAlt4, HiX } from "react-icons/hi";
import { useCartContext } from '../Context/cartContext';

const Header = () => {

    const [ dashboard, setDashboard ] = useState(false);

    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
    console.log(user);
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

                {
                    isAuthenticated
                        ? <Link to="/profile">
                            <div className='user-auth'
                                onMouseEnter={() => setDashboard(!dashboard)}
                                onMouseOut={() => setDashboard(!dashboard)}>
                                <h5 className='welcome'>
                                    {dashboard ? "profile" : user.given_name}
                                </h5>
                            </div>
                        </Link>
                        : null
                }

                <div className='nav'>
                    <Link to="/products" className='Link' onClick={closeMenu}>Products</Link>
                    <Link to="/about" className='Link' onClick={closeMenu}>About</Link>
                    <Link to="/contact" className='Link' onClick={closeMenu}>Contact</Link>
                </div>

                {
                    !isAuthenticated
                        ? <button
                            className='login'
                            onClick={() => {
                                loginWithRedirect();
                                closeMenu();
                            }}>
                            Login
                        </button>

                        : <button
                            className='login'
                            onClick={() => {
                                closeMenu();
                                logout({ logoutParams: { returnTo: window.location.origin } });
                            }}>
                            Logout
                        </button>
                }

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