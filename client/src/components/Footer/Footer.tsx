import React from "react";

import "./Footer.scss";


import Blog from "../../common/icon/blogger.svg";
import Facebook from "../../common/icon/facebook-box.svg";
import Twitter from "../../common/icon/twitter-box.svg";
import { useLocation } from 'react-router-dom';


const Footer = () => {

    const location = useLocation();

    if (location.pathname === '/profile' || location.pathname === '/record' || location.pathname === '/accountForm' || location.pathname === '/transactionForm' || location.pathname === '/account') {
    return null
    }
    return (
        <>
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-item">
                        <p>&copy; P.Ohatta {new Date().getFullYear()}</p>
                    </div>
                    <div className="footer-item">
                        <ul className="footer-icons">
                            <li className="footer-icon">
                                <a href="https://pohatta.com">
                                    <img src={Blog} alt="Blogi" />
                                </a>
                            </li>
                            <li className="footer-icon">
                                <a href="https://facebook.com/pohatta">
                                    <img src={Facebook} alt="Facebook" />
                                </a>
                            </li>
                            <li className="footer-icon">
                                <a href="https://twitter.com/RahaPohatta">
                                    <img src={Twitter} alt="Twitter" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-item">
                        <ul className="footer-links">
                            <li className="footer-link">
                                <a href="/">Privacy Policy</a>
                            </li>
                            <li className="footer-link">
                                <a href="/">Terms of Use</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
