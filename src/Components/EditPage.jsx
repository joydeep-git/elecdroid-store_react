import React, { useEffect } from 'react';

import "../SCSS/EditPage.scss";

import { useFirebaseContext } from '../Context/FirebaseContext';

const EditPage = () => {

    const { cancelEdit, userData, newUserData, setNewUserData, updateUserData,
        // updateAuthEmail 
    } = useFirebaseContext();

    useEffect(() => {
        setNewUserData(userData);
    }, [setNewUserData, userData]);

    const handleUpdateData = (e) => {
        e.preventDefault();

        const alert = document.getElementById("alert");

        const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const { name, email, number, pincode, address } = newUserData;

        if (name === "") {
            alert.className = "alert";
            alert.innerText = "Please enter your name";
            return;
        } else if (!/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(name)) {
            alert.className = "alert";
            alert.innerText = "Please enter a valid name";
            return;
        } 
        // else if (email === "") {
        //     alert.className = "alert";
        //     alert.innerText = "Please enter your email";
        //     return;
        // } else if (!re.test(email)) {
        //     alert.className = "alert";
        //     alert.innerText = "Please enter a valid email";
        //     return;
        // } 
        else if (number === "") {
            alert.className = "alert";
            alert.innerText = "Please enter your number";
            return;
        } else if (number.length !== 10) {
            alert.className = "alert";
            alert.innerText = "Please enter valid number";
            return;
        } else if (pincode === "") {
            alert.className = "alert";
            alert.innerText = "Please enter pincode";
            return;
        } else if (pincode.length !== 6) {
            alert.className = "alert";
            alert.innerText = "Please enter a valid pincode";
            return;
        } else if (address === "") {
            alert.className = "alert";
            alert.innerText = "Please enter address";
            return;
        } else if (address.length < 3) {
            alert.className = "alert";
            alert.innerText = "Please enter a valid address"
        } else {
            alert.classList.remove("alert");

            updateUserData();

            // updateAuthEmail(email);
        }
    }

    return (
        <div className="EditPage">

            {newUserData && (
                <form>

                    <section>
                        <h3 className='reg'>User Registration</h3>
                        <p className='alert' id='alert'></p>
                    </section>

                    <div className='data-input'>
                        <label htmlFor="name">Change name</label>
                        <input
                            type="text"
                            name="name"
                            value={newUserData.name}
                            onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                        />
                    </div>

                    {/* <div className='data-input'>
                        <label htmlFor="email">Change email</label>
                        <input
                            type="email"
                            name="email"
                            value={newUserData.email}
                            onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                        />
                    </div> */}

                    <div className='data-input'>
                        <label htmlFor="number">Change Number</label>
                        <input
                            type="number"
                            name="number"
                            value={newUserData.number}
                            onChange={(e) => setNewUserData({ ...newUserData, number: e.target.value })}
                        />
                    </div>

                    <div className='data-input'>
                        <label htmlFor="pincode">Change Pincode</label>
                        <input
                            type="number"
                            name="pincode"
                            value={newUserData.pincode}
                            onChange={(e) => setNewUserData({ ...newUserData, pincode: e.target.value })}
                        />
                    </div>

                    <div className='data-input'>
                        <label htmlFor="address">Change Address</label>
                        <input
                            type="text"
                            name="address"
                            value={newUserData.address}
                            onChange={(e) => setNewUserData({ ...newUserData, address: e.target.value })}
                        />
                    </div>
                </form>

            )}

            <div className='buttons'>
                <button onClick={handleUpdateData}>SAVE CHANGES</button>
                <button onClick={cancelEdit}>CANCEL</button>
            </div>
        </div>
    )
}

export default EditPage;