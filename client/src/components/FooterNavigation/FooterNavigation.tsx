import React from "react";
import "./FooterNavigation.scss";
import Dashboard from "../../common/icon/footer_navigation/dashboard.svg";
import Record from "../../common/icon/footer_navigation/record.svg";
import Plan from "../../common/icon/footer_navigation/plan.svg";
import Settings from "../../common/icon/footer_navigation/settings.svg";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const FooterNavigation = ({ buttonAction }: any) => {
    const { t } = useTranslation('footerNavigation');

    return (
        <div className="footer-navigation">
            <NavLink to={"/dashboard" } className="footer-navigation-button" activeClassName="footer-link-active">
                <img src={Dashboard} alt="Dashboard" className="footer-img"/>
                <label>{t('dash')}</label>
            </NavLink>
            <NavLink to={"/record"} className="footer-navigation-button" activeClassName="footer-link-active">
                <img src={Record} alt="Record" className="footer-img"/>
                <label>{t('record')}</label>
            </NavLink>
            <NavLink to={"/plan"} className="footer-navigation-button" activeClassName="footer-link-active">
                <img src={Plan} alt="Plan" className="footer-img"/>
                <label>{t('plan')}</label>
            </NavLink>
            <NavLink to={"/profile"} className="footer-navigation-button" activeClassName="footer-link-active">
                <img src={Settings} alt="Settings" className="footer-img"/>
                <label>{t('settings')}</label>
            </NavLink>
        </div>
    );
};
export default FooterNavigation;
