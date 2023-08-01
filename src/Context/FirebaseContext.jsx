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
    const [userFirebaseData, setUserFirebaseData] = useState(null);
    const [userFirebaseId, setUserFirebaseId] = useState(null);
    const [userData, setUserData] = useState(null);
    const [userLoginData, setUserLoginData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [newUserData, setNewUserData] = useState(null);

    useEffect(() => {
        if (error !== null) {
            alert(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        if (userFirebaseData !== null) {
            setUserFirebaseId(userFirebaseData.uid);
        } else {
            setUserFirebaseId(null);
        }
    }, [userFirebaseData]);

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
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                setAuthenticated(true);
                setUserFirebaseData(user);
            } else {
                setAuthenticated(false);
                setUserFirebaseData(null);
                setUserData(null);
            }
        });
        return () => unsubscribe();
    }, []);

    //// SIGNOUT USER
    const userSignOut = () => {
        signOut(firebaseAuth);
        setAuthenticated(false);
        setUserFirebaseData(null);
        setUserData(null);
    };

    //// FETCHING DATA FROM FIREBASE
    useEffect(() => {
        if (userFirebaseData) {
            const userId = userFirebaseData.uid; // Use the updated userFirebaseData
            onValue(ref(firebaseDatabase, "users/" + userId), (snapshot) => {
                if (snapshot.exists()) {
                    const fetchedData = snapshot.val();
                    setUserData(fetchedData);
                } else {
                    setUserData(null);
                }
            });
        }
    }, [userFirebaseData]);

    //// SAVING DATA IN FIREBASE DATABASE
    useEffect(() => {
        if (authenticated && userFirebaseData !== null && userData !== null) {
            if (userFirebaseId) {
                if (userData.name !== userFirebaseData.displayName) {
                    set(ref(firebaseDatabase, `users/` + userFirebaseId), {
                        ...userData,
                    });
                }
            }
        }
    }, [authenticated, userFirebaseData, userData, userFirebaseId]);

    // EDIT PROFILE
    const handleEditProfile = () => {
        setEditMode(true);
    };

    const cancelEdit = () => {
        setEditMode(false);
    }

    const updateUserData = () => {
        setUserData(newUserData);
        setEditMode(false);
    }

    // const updateAuthEmail = (newEmail) => {
    //     if (userFirebaseData) {
    //         firebaseAuth.currentUser
    //             .updateEmail(newEmail)
    //             .then(() => {
    //                 setError("Email updated successfully!");
    //             })
    //             .catch((error) => {
    //                 setError("Error updating email: " + error.message);
    //             });
    //     }
    // };

    return (
        <firebaseContext.Provider value={{
            signUpUser, signInUser, userSignOut,
            authenticated, setAuthenticated,
            userData, setUserData,
            userFirebaseId, userFirebaseData,
            userLoginData, setUserLoginData,
            handleEditProfile,
            editMode, setEditMode,
            cancelEdit,
            newUserData, setNewUserData,
            updateUserData,
            // updateAuthEmail
        }}>

            {children}
        </firebaseContext.Provider>
    )
}