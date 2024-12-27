import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    let currentUser = null;
    const storageUser = localStorage.getItem('current-user')
    if(storageUser){
        currentUser = JSON.parse(storageUser) 
    }
    const [user, setUser] = useState(currentUser);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};