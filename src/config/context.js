import React, { createContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [email, setEmail] = useState('')
    const [currentResearchId, setCurrentResearchId] = useState('')
    const [currentResearchName, setCurrentResearchName] = useState('')
    const [currentResearchDate, setCurrentResearchDate] = useState('')
    const [currentResearchImage, setCurrentResearchImage] = useState('')
    const [currentCounters, setCurrentCounters] = useState({"Bom": 0, "Excelente": 0, "Neutro": 0, "Pessimo": 0, "Ruim": 0})

    return (
        <AppContext.Provider value={{ 
            email, setEmail,
            currentResearchId, setCurrentResearchId,
            currentResearchName, setCurrentResearchName,
            currentResearchImage, setCurrentResearchImage,
            currentResearchDate, setCurrentResearchDate,
            currentCounters, setCurrentCounters

        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
