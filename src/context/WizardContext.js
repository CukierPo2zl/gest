import React, { useState, createContext } from 'react';

export const WizardContext = createContext();

export const WizardProvider = ({children}) => {
    const [wizard, setWizard] = useState({
        open: false,
        content: null,
        fullScreen: false,
    })
    return (
        <WizardContext.Provider value={[wizard, setWizard]}>
            {children}
        </WizardContext.Provider>
    );
}