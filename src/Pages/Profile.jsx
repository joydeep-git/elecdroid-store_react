import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from "react-router-dom";
import { MdVerified } from "react-icons/md";

const Profile = () => {
    const redirect = useNavigate();
    const { user, isAuthenticated } = useAuth0();
    console.log(user.preferred_username);

    useEffect(() => {
        if (!isAuthenticated) {
            redirect("/");
        }
    }, [isAuthenticated, redirect]);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="Profile">

            {
                user.picture
                    ?
                    <img src={user.picture} alt={user.given_name} />
                    : null
            }

            {
                user.nickname
                    ?
                    <div>
                        <p>Username:</p>
                        <p>{user.nickname}</p>
                    </div>
                    : null
            }

            {
                user.name
                    ?
                    <div>
                        <p>Name:</p>
                        <p>{user.name}</p>
                    </div>
                    : null
            }

            {
                user.gender
                    ?
                    <div>
                        <p>Gender:</p>
                        <p>{user.gender}</p>
                    </div>
                    : null
            }

            {
                user.email
                    ?
                    <div>
                        <p>Email:</p>
                        <p>{user.email} {user.email_verified ? <MdVerified /> : null}</p>
                    </div>
                    : null
            }

            {
                user.birthdate
                    ?
                    <div>
                        <p>Date of Birth:</p>
                        <p>{user.birthdate}</p>
                    </div>
                    : null
            }

            {
                user.phone_number
                    ?
                    <div>
                        <p>Number:</p>
                        <p>{user.phone_number} {user.phone_number_verified ? <MdVerified /> : null}</p>
                    </div>
                    : null
            }

            {
                user.address
                    ?
                    <div>
                        <p>Address:</p>
                        <p>{user.address}</p>
                    </div>
                    : null
            }

            {
                user.profile
                    ?
                    <div>
                        <p>Locale:</p>
                        <p>{user.profile}</p>
                    </div>
                    : null
            }

        </div>
    );
};

export default Profile;