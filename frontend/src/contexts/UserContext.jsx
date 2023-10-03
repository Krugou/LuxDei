import {createContext, useState} from 'react';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [username, setUsername] = useState('');
    const [countryId, setCountryId] = useState('');

    return (
        <UserContext.Provider value={{username, setUsername, countryId, setCountryId}}>
            {children}
        </UserContext.Provider>
    );
};