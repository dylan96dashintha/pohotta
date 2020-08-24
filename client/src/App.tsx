import React, { useEffect } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "./store/index";

import LandingPage from "./scenes/Landing/Landing";
import AuthPage from "./scenes/Auth/Auth";
import AccountFormPage from "./scenes/AccountForm/AccountForm";
import Account from "./scenes/Account/Account";
import ProfilePage from "./scenes/Profile/Profile";
import RecordPage from "./scenes/Record/Record";
import TransactionForm from "./scenes/TransactionForm/TransactionForm";

import { checkAuthStatusThunk } from "./store/auth/thunks";
import FooterNavigation from './components/FooterNavigation/FooterNavigation';
import BaseScene from "./scenes/BaseScene/BaseScene";
import DashboardPage from './scenes/Dashboard/Dashboard';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import PlanPage from './scenes/Plan/Plan';

const App = () => {

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.token);
    // Check if user is authenticated
    useEffect(() => {
        dispatch(checkAuthStatusThunk());
    }, [dispatch]);

    let header: JSX.Element | null = <Navigation/>;
    let footer: JSX.Element = <Footer/>;
    let routes = (
        <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/auth" component={AuthPage} />
            <Redirect to="/auth" />
        </Switch>
    );



    if (isAuthenticated) {
        header = null;
        footer = <FooterNavigation />;
        routes = (
            <Switch>
                <Route exact path="/dashboard" component={DashboardPage} />
                <Route exact path="/record" component={RecordPage} />
                <Route exact path="/plan" component={PlanPage} />
                <Route path="/account/:accountId" component={Account} />
                <Route path="/accountform/:accountId?" component={AccountFormPage} />
                <Route path="/transactionform/:transactionId?" component={TransactionForm} />
                <Route exact path="/profile" component={ProfilePage} />
                <Redirect to="/record" />
            </Switch>
        );
    };

    return <>
        <BaseScene>
            {header}
            {routes}
            {footer}
        </BaseScene>
    </>;
};

export default withRouter(App);
