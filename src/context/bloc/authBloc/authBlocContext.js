import React, { createContext, useRef } from 'react';

export const AuthenticationContext = createContext();

export const BlocProvider = ({children, bloc}) => {
    
    const blocRef = useRef(bloc)

    return (
        <AuthenticationContext.Provider value={blocRef}>
            {children}
        </AuthenticationContext.Provider>
    );
}