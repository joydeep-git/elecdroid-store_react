import { createContext, useContext, useState, useEffect } from "react";

import { initializeApp } from "firebase/app";
import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut
} from "firebase/auth";
import { getDatabase, ref, set, onValue, } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyByJT7TQrqHii-su-IL7LYw6gvb9Vomc_A",
    authDomain: "elecdroid-store-e01b9.firebaseapp.com",
    projectId: "elecdroid-store-e01b9",
    storageBucket: "elecdroid-store-e01b9.appspot.com",
    messagingSenderId: "984631396800",
    appId: "1:984631396800:web:0102d73e4704341c12e025",
    measurementId: "G-Z9GCMR6JM1"
};

// initializing firebase
const firebase = initializeApp(firebaseConfig);

// creating custom hook to use firebase context
const firebaseContext = createContext();
export const useFirebaseContext = () => useContext(firebaseContext);

// FIREBASE SERVICES IMPLEMENTATION
const firebaseAuth = getAuth(firebase);
const firebaseDatabase = getDatabase(firebase);

export const FirebaseContextProvider = ({ children }) => {

    // USER DETAILS STATE
    const [userFirebaseData, setFirebaseUserData] = useState(null);

    let userFirebaseId = null;
    if (userFirebaseData !== null) {
        userFirebaseId = userFirebaseData.uid;
    }

    const [userData, setUserData] = useState(null);

    const [userLoginData, setUserLoginData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState(null);

    useEffect(() => {
        if (error !== null) {
            alert(error);
            setError(null);
        }
    }, [error])

    // AUTHENTICATION STATUS
    const [authenticated, setAuthenticated] = useState(false);

    // AUTHENTICATION
    const signUpUser = (email, password) => {
        createUserWithEmailAndPassword(firebaseAuth, email, password)
            .catch((err) => {
                setError(err.message);
            });
    };

    const signInUser = (email, password) => {
        signInWithEmailAndPassword(firebaseAuth, email, password)
            .catch((err) => {
                setError(err.message);
            });
    };

    //// CHECKING USER AUTHENTICATION STATE
    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                setAuthenticated(true);
                setFirebaseUserData(user);
            } else {
                setAuthenticated(false);
                setFirebaseUserData(null);
            }
        });
    }, [userFirebaseData]);

    //// SIGNOUT USER
    const userSignOut = () => {
        signOut(firebaseAuth);
        setAuthenticated(false);
        setFirebaseUserData(null);
        userFirebaseId = null;
    }

    //// FETCHING DATA FROM FIREBASE
    useEffect(() => {
        if (userFirebaseData) {
            onValue(ref(firebaseDatabase, "users/" + userFirebaseId), (snapshot) => {
                if (snapshot.exists()) {
                    const fetchedData = snapshot.val();
                    setUserData(fetchedData);
                }
            });
        }
    }, [userFirebaseData, userFirebaseId]);

    //// SAVING DATA IN FIREBASE DATABASE
    useEffect(() => {
        if (authenticated && userFirebaseData !== null && userData !== null) {
            if (userData.name !== userFirebaseData.displayName) {
                set(ref(firebaseDatabase, `users/` + userFirebaseId), {
                    ...userData,
                });
            }
        }
    }, [authenticated, userFirebaseData, userData, userFirebaseId]);

    useEffect(() => {
        console.log("userData", userData);
    }, [userData]);

    // EDIT PROFILE
    const handleEditProfile = () => { };

    // DELETE ACCOUNT
    const handleDeleteAccount = () => {
        if (authenticated && userFirebaseData !== null) {
            userFirebaseData.delete().catch((err) => setError(err));
            set(ref(firebaseDatabase, `users/` + userFirebaseId), []);
        }
    }

    return (
        <firebaseContext.Provider value={{
            signUpUser, signInUser, userSignOut,
            authenticated, setAuthenticated,
            userData, setUserData,
            userFirebaseId, userFirebaseData,
            userLoginData, setUserLoginData,
            handleEditProfile, handleDeleteAccount
        }}>
            {children}
        </firebaseContext.Provider>
    )
}