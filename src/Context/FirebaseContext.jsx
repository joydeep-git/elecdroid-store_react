import { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidV4 } from "uuid";

import { initializeApp } from "firebase/app";
import {
    getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged, signOut
} from "firebase/auth";
import { getDatabase, ref, set, get, onValue, } from "firebase/database";

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

// FIREBASE AUTH
const firebaseAuth = getAuth(firebase);

// FIREBASE DATABASE
const firebaseDatabase = getDatabase(firebase);






export const FirebaseContextProvider = ({ children }) => {

    // AUTHENTICATION STATE
    const [authenticated, setAuthenticated] = useState(false);

    // AUTHENTICATION

    const googleAuth = new GoogleAuthProvider();

    const googleSignIn = (e) => {
        e.preventDefault();
        try {
            signInWithPopup(firebaseAuth, googleAuth);
        } catch (e) {
            console.log(e);
        }
    }

    // SIGNOUT USER
    const userSignOut = () => {
        signOut(firebaseAuth);
    }

    return (
        <firebaseContext.Provider value={{ googleSignIn }}>
            {children}
        </firebaseContext.Provider>
    )
}