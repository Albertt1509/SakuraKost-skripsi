import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [redy, setRedy] = useState(false)

    useEffect(() => {
        //get data 
        const fetchData = async () => {
            try {
                const { data } = await axios.get('/profile');
                setUser(data);
                setRedy(true)
            } catch (error) {
                // Handle error 
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, redy }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;
