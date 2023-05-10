import React from 'react';
import { Link } from 'react-router-dom';

const HomeNavigation = ({ link, linkName, name }) => {
    return (
        <div className='HomeNavigation'>
            <Link to={link} className='nav'>{linkName}</Link>
            <span> / </span>
            <span>{name}</span>
        </div>
    )
}

export default HomeNavigation;