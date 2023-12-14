import { createContext, useContext } from 'react';
import { storeUser,removeUser } from './storage';


const AuthContext = createContext({ user: {} });

const useAuthContext = () => {
    const { user, setUser } = useContext(AuthContext);

    const login = (user) => {
        setUser(user);
        storeUser(user);
    };

    const logout = () => {
        setUser(null);
        console.log('logout');
        removeUser();
    };

    return { user, login, logout };
};

export { AuthContext, useAuthContext };