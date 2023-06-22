import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFilterContext } from '../Context/filter_context';
import '../SCSS/SignUp.scss';

function Login() {

    const redirect = useNavigate();
    const { setAuthenticated, profileData, setProfileData } = useFilterContext();

    const [userLoginData, setUserLoginData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserLoginData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const alert = document.getElementById('alert');
        const { email, password } = userLoginData;
        const registeredData = localStorage.getItem('ACCOUNTS');

        if (email === '') {
            alert.innerText = 'Please enter an email';
            alert.className = 'alert';
        } else if (password === '') {
            alert.innerText = 'Please enter a password';
            alert.className = 'alert';
        } else {
            alert.className = '';

            const userRegData = JSON.parse(registeredData);

            const userData = userRegData.find(
                (element) => element.email === email && element.password === password
            );

            setProfileData(userData);

            if (!userData) {
                alert.innerText = 'Invalid details';
                alert.className = 'alert';
            } else {
                setAuthenticated(true);
                redirect('/profile');
            }
        }
    };

    return (
        <div className="SignUp">
            <form onSubmit={handleSubmit}>
                <h1 className="reg">Login</h1>
                <p id="alert" className="alert"></p>
                <div className="data-input">
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        id="email"
                        className="email"
                        name="email"
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="data-input">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        id="password"
                        className="password"
                        name="password"
                        required
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" id="register">
                    Login
                </button>
                <h5>
                    Don't have an account?
                    <br />
                    <Link to="/signup">Sign Up</Link>
                </h5>
            </form>
        </div>
    );
}

export default Login;