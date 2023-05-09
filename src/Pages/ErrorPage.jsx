import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="ErrorPage">

            <h2>404</h2>
            <h2>OH NO! YOU ARE LOST.</h2>
            <p>The page you are looking for doesn't exist. How you got here is a mystry, but don't worry, click this button to get back to homepage.</p>
            <button>
                <Link to='/'>HOME</Link>
            </button>

        </div>
    )
}

export default ErrorPage;