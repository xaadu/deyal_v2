import React from 'react';
import { Redirect, Route } from 'react-router';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({ children, ...rest}) => {
    const { user, isLoading } = useAuth();

    if(isLoading){
        return (
            <div className="d-flex justify-content-center text-main">
                <h1>Loading.....</h1>
                <div className="mt-2 ms-2 spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <Route
            { ...rest }
            render={({ location }) => 
            user.email ? (children) : (
                <Redirect
                to={{
                    pathname: "/join",
                    state: { from: location },
                }}
                ></Redirect>
            )
        }
        ></Route>
    );
};

export default PrivateRoute;