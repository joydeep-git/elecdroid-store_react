import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "../SCSS/Profile.scss";

import { useFirebaseContext } from '../Context/FirebaseContext';
import Loading from '../Helpers/Loading';

const Profile = () => {
    const navigate = useNavigate();
    const { authenticated, userData,
        handleDeleteAccount } = useFirebaseContext();

    const [del, setDel] = useState(false);

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
                <div className="display-data">
                    <form>
                        <div className='data'>
                            <label htmlFor="name">Name:</label>
                            <input type="text" name="name" disabled value={userData.name} />
                        </div>

                        <div className='data'>
                            <label htmlFor="email">Email:</label>
                            <input type="email" name="email" disabled value={userData.email} />
                        </div>

                        <div className='data'>
                            <label htmlFor="number">Number:</label>
                            <input type="number" name="number" disabled value={userData.number} />
                        </div>

                        <div className='data'>
                            <label htmlFor="pincode">Pincode:</label>
                            <input type="number" name="pincode" disabled value={userData.pincode} />
                        </div>

                        <div className='data'>
                            <label htmlFor="address">Address:</label>
                            <input type="text" name="address" disabled value={userData.address} />
                        </div>
                    </form>
                </div>
            )}

            <div className='editBtn'>
                <button onClick={() => navigate("/edit")}>EDIT ACCOUNT</button>
            </div>

            <div className='deleteBtn'>
                {
                    !del
                        ? <button onClick={() => setDel(true)} >DELETE ACCOUNT</button>
                        : <div>
                            <button onClick={() => handleDeleteAccount(userData.email, userData.password)} >CONFIRM DELETE</button>
                            <button onClick={() => setDel(false)}>CANCEL</button>
                        </div>
                }
            </div>
        </div>
    );
};

export default Profile;