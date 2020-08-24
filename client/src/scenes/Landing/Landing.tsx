import React, { useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";

import "./Landing.scss";

import axios from "../../common/tools/axios";
import Target from "../../common/icon/target.svg";
import Destination from "../../common/icon/plan.svg";
import Track from "../../common/icon/dashboard.svg";
import Security from "../../common/icon/security.svg";

import Card from "../../components/Card/Card";
import TargetCalculator from "../../components/TargetCalculator/TargetCalculator";
import { useTranslation } from 'react-i18next';

const Landing = () => {
    // Get landing page on page load
    useEffect(() => {
        axios.get("/landing-page/");
    }, []);
    const { t } = useTranslation('landing');

    return (
        <div className="landing">
            <div className="main-header" id="home">
                <div className="welcome">
                    <div className="welcome-bg">
                        <div className="row">
                            <div className="main-cta content">
                                <h1 className="landing-page-header-main"> {t('main_title')}</h1>
                                <p className="landing-page-description">{t('main_description')}</p>
                                <Link to="/#calculator" className="link-button link-button__primary">
                                    {t('main_button')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="before-target-calculator" id="before-calculator"></section>
            <section className="target-calculator" id="calculator">
                <TargetCalculator />
            </section>
            <section className="about" id="about">
                <div className="row">
                    <div className="full">
                        <h1 className="landing-page-header">{t('coming_soon')}</h1>
                        <div className="row">
                            <div className="info-step">
                                <div className="info-image">
                                    <span>1.</span>
                                    <img className="info-img" src={Target} alt={t('target_header')} />
                                </div>
                                <h2>{t('target_header')}</h2>
                                <p className="landing-page-text">{t('target_description')}</p>
                            </div>
                            <div className="info-step">
                                <div className="info-image">
                                    <span>2.</span>
                                    <img className="info-img" src={Track} alt={t('track_header')} />
                                </div>
                                <h2>{t('track_header')}</h2>
                                <p className="landing-page-text">{t('track_description')}</p>
                            </div>
                            <div className="info-step">
                                <div className="info-image">
                                    <span>3.</span>
                                    <img className="info-img" src={Destination} alt={t('plan_header')} />
                                </div>
                                <h2>{t('plan_header')}</h2>
                                <p className="landing-page-text">{t('plan_description')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pricing" id="pricing">
                <div className="row">
                    <div className="full">
                        <h1 className="landing-page-header">{t('pricing_title')}</h1>
                        <p className="landing-page-text">{t('pricing_description')}</p>
                        <div className="row">
                            <Card
                                plan={t('free')}
                                desc={t('free_description')}
                                price={t('free_per_month')}
                                descBottom={t('free_description_bottom')}
                            ></Card>
                            <Card
                                plan={t('paid')}
                                desc={t('paid_description')}
                                price={t('price_per_month')}
                                descBottom={t('paid_description_bottom')}
                            ></Card>
                        </div>
                    </div>
                </div>
            </section>

            <section id="security" className="security">
                <div className="row">
                    <div className="full">
                        <div className="item-row">
                            <h1 className="landing-page-header">{t('security_title')}</h1>
                            <img src={Security} alt={t('security_title')} />
                            <p className="landing-page-text content">{t('security_description')}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="dream" className="dream">
                <div className="row">
                    <div className="full">
                        <div className="item-row">
                            <h1 className="join-header">{t('join_title')}</h1>
                            <p className="landing-page-text content">{t('join_description_1')}</p>
                            <p className="landing-page-text content">
                                {t('join_late')}
                                <a href="mailto:info@pohatta.com" className="green-text" target="blank">
                                    {t('join_description_email')}
                                </a>
                                {t('join_late_2')}
                                <i>{t('join_description_pohatta')}</i>
                            </p>

                            <p className="landing-page-text content small">{t('join_description_7')}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default Landing;
