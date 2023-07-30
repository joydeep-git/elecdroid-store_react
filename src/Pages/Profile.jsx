import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFirebaseContext } from '../Context/FirebaseContext';
import Loading from '../Helpers/Loading';

const Profile = () => {
    const navigate = useNavigate();
    const { authenticated, userData, handleEditProfile, handleDeleteAccount } = useFirebaseContext();

    useEffect(() => {
        if (!authenticated) {
            navigate("/login");
        }
    }, [authenticated, navigate]);

    if (!authenticated) {
        return <Loading />;
    }

    return (
        <div className='Profile'>
            <div className='title'>
                <h1>PROFILE</h1>
            </div>

            {userData && (
                <div className='details'>
                    {
                        userData.name
                            ? <div className='data'>
                                <label htmlFor="name">Name:</label>
                                <input type="text" name="name" disabled value={userData.name || ''} />
                            </div>
                            : null
                    }

                    {
                        userData.email
                            ? <div className='data'>
                                <label htmlFor="email">Email:</label>
                                <input type="email" name="email" disabled value={userData.email || ''} />
                            </div>
                            : null
                    }

                    {
                        userData.number
                            ? <div className='data'>
                                <label htmlFor="number">Number:</label>
                                <input type="number" name="number" disabled value={userData.number || ''} />
                            </div>
                            : null
                    }

                    {
                        userData.pincode
                            ? <div className='data'>
                                <label htmlFor="pincode">Pincode:</label>
                                <input type="number" name="pincode" disabled value={userData.pincode || ''} />
                            </div>
                            : null
                    }

                    {
                        userData.address
                            ? <div className='data'>
                                <label htmlFor="address">Address:</label>
                                <input type="text" name="address" disabled value={userData.address || ''} />
                            </div>
                            : null
                    }
                </div>
            )}

            <div className='btns'>
                <button onClick={handleDeleteAccount}>Delete account</button>
            </div>
        </div>
    );
};

export default Profile;