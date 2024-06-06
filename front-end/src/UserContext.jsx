import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { axioslib } from './lib/axioslib';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axioslib.get('/api/user/getuserbyid');
                console.log('Fetched user:', response.data);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
