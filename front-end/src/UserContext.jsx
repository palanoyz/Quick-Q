import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { axioslib } from './lib/axioslib';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLogin, setIsLogin] = useState(false);

    const fetchUser = async () => {
        try {
            const response = await axioslib.get('/api/user/getuserbyid');
            const { data, status } = response;
            if (status === 200 && data?.message !== "Unauthorized") {
                setUser(data);
                setIsLogin(true);
            } else {
                setIsLogin(false);
                setUser(undefined);
            }
        } catch (error) {
            console.log(error.response?.status);
            setIsLogin(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, isLogin, setIsLogin }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
