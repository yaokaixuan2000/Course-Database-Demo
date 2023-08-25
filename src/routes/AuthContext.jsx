// AuthContext.js

import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    const updateLoggedInStatus = (status) => {
        setLoggedIn(status);
    };

    return (
        <AuthContext.Provider value={{ loggedIn, updateLoggedInStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
