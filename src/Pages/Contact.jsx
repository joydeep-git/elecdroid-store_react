import React, { useEffect } from 'react';
import "../SCSS/Contact.scss";

import { useAuth0 } from '@auth0/auth0-react';

const Contact = () => {

    useEffect(() => {
        
        function autoExpandTextarea() {
            const textarea = document.getElementById('message');
            textarea.style.height = 'auto';
            
            textarea.style.height = (textarea.scrollHeight) + 'px';
        }

        const textarea = document.getElementById('message');
        textarea.addEventListener('input', autoExpandTextarea);

        return () => {
            textarea.removeEventListener('input', autoExpandTextarea);
        };
    }, []);

    const { user, isAuthenticated } = useAuth0();

    return (
        <div className='Contact'>

            <h1>Contact</h1>

            <div className='map'>
                <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15550.62573603968!2d77.65032641738283!3d12.9938127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1136218ea079%3A0xc6bf20ea89abad92!2sGoogle%20RMZ%20Infinity!5e0!3m2!1sen!2sin!4v1683557471447!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style={{ border: 0, }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade" ></iframe>
            </div>

            <form action="https://formspree.io/f/xrgvjvrd" method='post' className='form'
            >

                <h3>Contact Form</h3>

                <div className='data-input'>

                    <input
                        type="text"
                        name="name"
                        id="name" placeholder='Enter your name'
                        value={isAuthenticated ? user.name : null}
                        autoComplete='off'
                        required />

                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={isAuthenticated ? user.email : null}
                        placeholder='Enter your e-mail'
                        autoComplete='off' />

                    <textarea
                        autoComplete='off'
                        name="message"
                        id="message"
                        placeholder='Enter the message'
                    ></textarea>
                </div>

                <button type="submit">SUBMIT</button>

            </form>

            <div className='message'>
                <span>***</span>
                <br />
                It is a live form. I will receive everything you submit.
                <br />
                Please don't hesitate to share your valuable feedback through this form.
            </div>

        </div>
    )
}

export default Contact;