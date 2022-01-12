import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import './Spinner.css'

const AdminRoute = ({children, ...rest}) => {
    const {user, admin, isLoading} = useAuth();
    if (isLoading) {
        return <div className="flex items-center justify-center h-screen w-full "><div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"></div></div>
    }
    return (
        <Route 
            {...rest} 
            render={
                ({ location }) => user.email && admin ? children : <Redirect to={{
                    pathname: "/",
                    state: {from: location}
                }} ></Redirect>
            } 
        >
            
        </Route>
    );
};

export default AdminRoute;