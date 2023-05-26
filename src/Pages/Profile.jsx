import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from "react-router-dom";
import { MdVerified } from "react-icons/md";

const Profile = () => {
    const redirect = useNavigate();
    const { user, isAuthenticated } = useAuth0();
    console.log(user);

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
            <img src={user.picture} alt={user.given_name} />
            <p>
                {user.name}
                {user.email_verified ? <MdVerified /> : null}
            </p>
        </div>
    );
};

export default Profile;