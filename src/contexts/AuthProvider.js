import React, { createContext } from 'react'
import firebaseInit from '../firebaase/firebase.init';
import useFirebase from '../hooks/useFirebase';

firebaseInit();

const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const allContext = useFirebase();
    return (
        <AuthContext.Provider value={allContext}>
            {children}
        </AuthContext.Provider>
    )
}
export { AuthProvider, AuthContext };