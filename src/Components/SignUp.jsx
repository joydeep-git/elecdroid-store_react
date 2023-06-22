import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "../SCSS/SignUp.scss";
import PasswordStrengthBar from 'react-password-strength-bar';
import { v4 as uuidv4 } from 'uuid';

function SignUp() {

    const clearInput = document.querySelectorAll('input');

    const redirect = useNavigate();

    const generateShortId = () => {
        const uuid = uuidv4();
        return uuid.substring(0, 8);
    };

    const [userData, setUserData] = useState({
        id: generateShortId(),
        name: "",
        email: "",
        number: "",
        password: "",
    });

    const { password } = userData;

    const handleChange = (e) => {

        const { name, value } = e.target;

        setUserData(() => {
            return {
                ...userData,
                [name]: value
            }
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, email, number, password } = userData;

        const alert = document.getElementById("alert");

        const confirmPassword = document.getElementById("confirmPassword").value;

        const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (name === "") {
            alert.className = "alert";
            alert.innerText = "Please enter your name";
            return;
        } else if (!/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(name)) {
            alert.className = "alert";
            alert.innerText = "Please enter a valid name";
            return;
        } else if (email === "") {
            alert.className = "alert";
            alert.innerText = "Please enter your email";
            return;
        } else if (!re.test(email)) {
            alert.className = "alert";
            alert.innerText = "Please enter a valid email";
            return;
        } else if (number === "") {
            alert.className = "alert";
            alert.innerText = "Please enter your number";
            return;
        } else if (number.length !== 10) {
            alert.className = "alert";
            alert.innerText = "Please enter valid number";
            return;
        } else if (password === "") {
            alert.className = "alert";
            alert.innerText = "Please enter a password";
            return;
        } else if (password.length < 6) {
            alert.className = "alert";
            alert.innerText = "password must have 6 charaters";
            return;
        } else if (password !== confirmPassword) {
            alert.className = "alert";
            alert.innerText = "Passwords do not match";
            return;
        } else {
            alert.classList.remove("alert");

            const existingData = JSON.parse(localStorage.getItem("ACCOUNTS")) || [];
            existingData.push(userData);
            localStorage.setItem("ACCOUNTS", JSON.stringify(existingData));

            clearInput.forEach((input) => {
                input.value = ''
            });

            redirect("/login");
        }
    };

    return (
        <div className="SignUp">

            <form>

                <section>
                    <h3 className='reg'>User Registration</h3>
                    <p className='alert' id='alert'></p>
                </section>

                <div className='data-input'>

                    <label htmlFor="name">Name</label>

                    <input
                        type="text"
                        placeholder='Enter your Name'
                        name='name'
                        id='name'
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='data-input'>

                    <label htmlFor="email">E-mail</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        id="email"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='data-input'>
                    <label htmlFor="number">Number</label>

                    <input
                        type="number"
                        name="number"
                        id="number"
                        placeholder='Enter your number'
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='data-input'>
                    <label htmlFor="gender">Gender</label>

                    <select name="gender" id="gender" onChange={handleChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>

                </div>

                <div className='data-input'>
                    <label htmlFor="password">Password</label>

                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder='Enter password'
                        onChange={handleChange}
                        required
                    />
                </div>

                <PasswordStrengthBar password={password} />

                <div className='data-input'>
                    <label htmlFor="confirmPassword">Confirm <br /> Password</label>

                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder='Confirm Password'
                        required
                    />
                </div>

                <button
                    type='submit'
                    id='register' onClick={handleSubmit}> Register </button>

                <h5>Already have an account? <br /> <Link to="/login">Login</Link></h5>

            </form>

        </div>
    )
}

export default SignUp;