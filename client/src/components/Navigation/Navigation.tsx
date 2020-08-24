import React, { useState } from "react";

import "./Navigation.scss";
import MenuIcon from "../../common/icon/menu.svg";
import Logo from "../../common/images/logo.png";

import { NavHashLink } from "react-router-hash-link";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation('landingPageNavigation');
    const toggle = () => setIsOpen(!isOpen);
    const location = useLocation();

    if (
        location.pathname === "/auth" ||
        location.pathname === "/profile" ||
        location.pathname === "/record" ||
        location.pathname === "/accountForm" ||
        location.pathname === "/transactionForm" ||
        location.pathname === "/account"
    ) {
        return null;
    }

    return (
        <header className="navigation">
            <div className="navigation-content">
                <div className="logo">
                    <NavHashLink smooth to={{ pathname: "/", hash: "#home" }} className="logo-link">
                        <img src={Logo} className="logo-img" alt="logo" />
                    </NavHashLink>
                </div>
                <nav className="nav">
                    <img src={MenuIcon} className="menu-icon" onClick={toggle} alt="menu-icon" />
                    <ul className={`collapsed ${isOpen ? "is-expanded" : ""}`}>
                        <li>
                            <NavHashLink activeClassName="active" smooth to={{ pathname: "/", hash: "#calculator" }} onClick={toggle}>
                                {t('linkTextCalculator')}
                            </NavHashLink>
                        </li>
                        <li>
                            <NavHashLink activeClassName="active" smooth to={{ pathname: "/", hash: "#about" }} onClick={toggle}>
                                {t('linkTextAbout')}
                            </NavHashLink>
                        </li>
                        <li>
                            <NavHashLink activeClassName="active" smooth to={{ pathname: "/", hash: "#pricing" }} onClick={toggle}>
                                {t('linkTextPricing')}
                            </NavHashLink>
                        </li>
                        <li>
                            <NavHashLink activeClassName="active" smooth to={{ pathname: "/", hash: "#security" }} onClick={toggle}>
                                {t('linkTextSecurity')}
                            </NavHashLink>
                        </li>
                        <li>
                            <NavHashLink activeClassName="active" smooth to={{ pathname: "/", hash: "#dream" }} onClick={toggle}>
                                {t('linkTextJoin')}
                            </NavHashLink>
                        </li>
                        <li>
                            <NavHashLink to={{ pathname: "/auth" }}>
                                <span className="navi-outline-item">{t('linkTextLogin')}</span>
                            </NavHashLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};
export default Navigation;
