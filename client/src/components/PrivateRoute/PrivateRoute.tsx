import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { checkAuthStatusThunk } from "../../store/auth/thunks";

export const PrivateRoute: React.FC<{component: React.FC;path: string;exact: boolean;}> = (props) => {
    
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.token);
    // Check if user is authenticated
    useEffect(() => {
        dispatch(checkAuthStatusThunk());
    }, []);

    return isAuthenticated ? <Route path={props.path} exact={props.exact} component={props.component} /> : <Redirect to="/login" />;
};
export default PrivateRoute;
