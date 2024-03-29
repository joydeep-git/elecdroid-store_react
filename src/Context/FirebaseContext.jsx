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
    const [newUserData, setNewUserData] = useState(null);
    const [userCartData, setUserCartData] = useState([]);
    const [authenticated, setAuthenticated] = useState(false);

    // HANDLING ERRORS AND SHOWING THEM
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
        setUserCartData([]);
    };

    //// FETCHING PROFILE DATA FROM FIREBASE
    useEffect(() => {
        if (userFirebaseData && userFirebaseId) {
            onValue(ref(firebaseDatabase, "users/" + userFirebaseId + "/profile"), (snapshot) => {
                if (snapshot.exists()) {
                    const fetchedData = snapshot.val();
                    setUserData(fetchedData);
                } else {
                    setUserData(null);
                }
            });
        }
    }, [userFirebaseData, userFirebaseId]);

    //// SAVING PROFILE DATA IN FIREBASE DATABASE
    useEffect(() => {
        if (authenticated && userFirebaseData !== null && userData !== null) {
            if (userFirebaseId && userFirebaseId) {
                if (userData.name !== userFirebaseData.displayName) {
                    set(ref(firebaseDatabase, `users/` + userFirebaseId + "/profile"), {
                        ...userData,
                    });
                }
            }
        }
    }, [authenticated, userFirebaseData, userData, userFirebaseId]);

    const updateUserData = () => {
        setUserData(newUserData);
    }

    const handleDeleteAccount = (email, password) => {
        if (authenticated && userFirebaseData !== null) {
            signInWithEmailAndPassword(firebaseAuth, email, password);
            if (userFirebaseId && userFirebaseId) {
                set(ref(firebaseDatabase, `users/` + userFirebaseId), null)
                    .then(() => {
                        userFirebaseData.delete()
                            .then(() => {
                                setAuthenticated(false);
                                setUserFirebaseData(null);
                                setUserData(null);
                                setError(null);
                            })
                            .catch((error) => {
                                setError("Error deleting account: " + error.message);
                            });
                    })
                    .catch((error) => {
                        setError("Error deleting account: " + error.message);
                    });
            }
        }
    };

    // FETCHING CART DATA FROM DATABASE
    useEffect(() => {
        if (userFirebaseId) {
            onValue(
                ref(firebaseDatabase, `users/${userFirebaseId}/cart`),
                (snapshot) => {
                    if (snapshot.exists()) {
                        const cartData = snapshot.val();
                        setUserCartData(cartData);
                    }
                }
            );
        }
    }, [userFirebaseId]);

    // STORING CART DATA IN FIREBASE
    useEffect(() => {
        if (authenticated && userFirebaseId) {
            if (userCartData.length > 0) {
                set(ref(firebaseDatabase, `users/${userFirebaseId}/cart`), userCartData);
            }
        }
    }, [authenticated, userFirebaseId, userCartData]);

    const demoLogin = () => {
        signInWithEmailAndPassword(firebaseAuth, "demo@demo.demo", "123456");
    }

    return (
        <firebaseContext.Provider value={{
            signUpUser, signInUser, userSignOut,
            authenticated, setAuthenticated,
            userData, setUserData,
            userFirebaseId, userFirebaseData,
            userLoginData, setUserLoginData,
            newUserData, setNewUserData,
            updateUserData, handleDeleteAccount,
            userCartData, setUserCartData,
            demoLogin, setError,
        }}>
            {children}
        </firebaseContext.Provider>
    )
}