import React, { useState, createContext } from 'react';
import { useEffect } from 'react';
import { getMySheets } from '../services';

export const CachedSheetsContext = createContext();



export const CachedSheetsProvider = ({children}) => {
    const [sheets, setSheets] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false);
    const [needResetSignal, setNeedResetSignal] = useState(false)

    useEffect(() => {
        const handleGetMySheets = async () => {
            let response = await getMySheets()
            let sheets = []
            response.forEach(sheet => {
                sheets.push({ data: sheet, checked: false })
            });
            setSheets(sheets)
            setIsLoaded(true)
        }

        if(needResetSignal === true || sheets == null){
            setIsLoaded(false)
            handleGetMySheets();
            setNeedResetSignal(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [needResetSignal])
    
    return (
        <CachedSheetsContext.Provider value={[sheets, setSheets, isLoaded, setNeedResetSignal]}>
            {children}
        </CachedSheetsContext.Provider>
    );
}