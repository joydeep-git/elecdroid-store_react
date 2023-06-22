import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFilterContext } from '../Context/filter_context';

const Profile = () => {

    const redirect = useNavigate();

    const { profileData, authenticated, setAuthenticated } = useFilterContext();

    console.log(profileData);

    useEffect(() => {
        if (!authenticated) {
            redirect("/");
        }
    }, [authenticated, redirect]);

    if (!authenticated) {
        return null;
    }

    return (
        <div>Profile</div>
    )
}

export default Profile;