// AdminRoute.js
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import UserContext from '../components/user/userContext';

const AdminRoute = ({ element: Component, ...rest }) => {
    const { user } = useContext(UserContext);
    const isAdmin = user && user.role === 'admin';

    return (
        <Route
            {...rest}
            element={isAdmin ? <Component /> : <Navigate to="/login" />}
        />
    );
};

export default AdminRoute;
