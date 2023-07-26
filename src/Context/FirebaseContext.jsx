import { createContext, useContext, useState, useEffect } from "react";

const firebaseContext = createContext();

export const useFirebaseContext = () => useContext(firebaseContext);

export const FirebaseContextProvider = ({ children }) => {
    return (
        <firebaseContext.Provider value={{}}>
            {children}
        </firebaseContext.Provider>
    )
}