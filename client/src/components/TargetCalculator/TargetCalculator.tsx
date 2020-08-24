import React, { Fragment, useState } from "react";
import { useFormik } from "formik";
import { HashLink as Link } from 'react-router-hash-link';
import axios from "../../common/tools/axios";
import handleError from '../../common/tools/apiErrorHandler'

import "./TargetCalculator.scss";
import ReportVisual from '../Report/ReportVisual/ReportVisual';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FormValues } from  '../TargetCalculator/ITargetCalculator'
import NumberFormat from 'react-number-format';
import {validate, formatMoney, formatDate} from '../../common/tools/helpers';
import Modal from '../Modal/Modal';
import { useTranslation } from 'react-i18next';

const TargetCalculator = () => {
    const { t } = useTranslation('targetCalculator');
    const [report, setReport] = useState<{ [key: string]: any }>({});
    const [apiError, setApiError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState<boolean>(true);
    const [fetching, setFetching] = useState<boolean>(false);
    const errorSpan = (message:string) => { return <span className="error">{message}</span>; }
    const initialValues: FormValues = {
        currentInvestments: undefined, //<NumberFormatProps>
        monthlyIncome: undefined,
        monthlyCost: undefined,
        goal: undefined,
        interestRate: undefined
    }
    const formik = useFormik({
        initialValues: initialValues,
        validate,
        onSubmit: values => {
            setApiError(null);
            setFetching(true);
            const data = {
                currentInvestments: values.currentInvestments,
                goal: values.goal || values.goal === 0 ? values.goal : null, // null's purpose is that user can see required retiriment fund, zero is not allowed in the backend
                monthlyIncome: values.monthlyIncome,
                monthlyCost: values.monthlyCost,
                interestRate: values.interestRate
            };
            axios
                .post("/landing-page/forecast", data)
                .then(response => {
                    setShowForm(false);
                    setReport(response.data);
                    setFetching(false);

                    // Scroll to where the calculator / result starts (does't work in IE).
                    const elem = document.getElementById("calculator");
                    const y = elem && elem.getBoundingClientRect().top + window.pageYOffset;
                    y && window.scrollTo({top: y, behavior: 'smooth'});
                })
                .catch(error => {
                    setFetching(false);
                    // console.log(error);
                    if (error.response) {
                        const errRes = error.response;
                        // console.log(errRes);
                        if (errRes.hasOwnProperty("data")) {

                            if (errRes.data.hasOwnProperty("message")) {
                                const errors = handleError(errRes.data)
                                if (errors.hasOwnProperty('mainError')) {
                                    setApiError(t(errors.mainError));
                                }

                                if (errors.hasOwnProperty('inputErrors')) {
                                    formik.setErrors(t(errors.inputErrors));
                                    formik.setFieldTouched(Object.keys(errors.inputErrors)[0], true, false); // input insert & erase doesn't trigger default touhed
                                }
                            }
                            // too many requests
                            if (errRes.status === 429) {
                                setApiError('e_too_many_req');
                            }
                        }
                    // Api not running error
                    } else {
                        setApiError('e_api_not_running');
                    }
                });
        }
    });

    // Return to form after submit
    const returnToForm = () => {
        setReport({});
        setShowForm(true);
        const elem = document.getElementById("calculator");
        elem && elem.scrollIntoView();
    };

    // Add string to result if fire used in calculation
    const fiRe:boolean = formik.values.goal ? false : true;

    // If it takes more than 3 years to reach goal, ask to join
    const joinCta:boolean = report.fullYears > 3 ? true : false;


    const form = (
      <Fragment>
            <div className="calculator-container">
                <div className="content">
                    <h1 className="main">{t('calculator_header')}</h1>

                    {showForm ? (
                        <div>
                            <p className="main">{t('calculator_desc')}</p>
                            <h2 className="second">{t('calculator_action')}</h2>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="input-row">
                                    <div className="input-container">
                                        <label>
                                            {t('now_header')}<Modal title={t('d_assets_title')} desc={t('d_assets')} cancelText={t('d_cancel')} setDefaultVisible={true}/>
                                            {formik.errors.currentInvestments && formik.touched.currentInvestments && errorSpan(t(formik.errors.currentInvestments))}
                                        </label>
                                        <NumberFormat thousandSeparator={' '}
                                            id="currentInvestments"
                                            name="currentInvestments"
                                            placeholder={t('now_placeholder')}
                                            type="text"
                                            onValueChange={val => formik.setFieldValue('currentInvestments', val.floatValue)}
                                            value={formik.values.currentInvestments}
                                        />
                                    </div>
                                </div>
                                <div className="input-row">
                                    <div className="input-container">
                                        <label>
                                            {t('income_per_month')}<Modal title={t('d_income_title')} desc={t('d_income')} cancelText={t('d_cancel')} setDefaultVisible={true}/>
                                            {formik.errors.monthlyIncome && formik.touched.monthlyIncome && errorSpan(t(formik.errors.monthlyIncome))}
                                        </label>
                                        <NumberFormat thousandSeparator={' '}
                                            id="monthlyIncome"
                                            name="monthlyIncome"
                                            placeholder={t('fill')}
                                            type="text"
                                            onValueChange={val => formik.setFieldValue('monthlyIncome', val.floatValue)}
                                            value={formik.values.monthlyIncome}
                                        />
                                    </div>
                                    <div className="input-container">
                                        <label>
                                            {t('costs_per_month')}<Modal title={t('d_cost_title')} desc={t('d_cost')} cancelText={t('d_cancel')} setDefaultVisible={true}/>
                                            {formik.errors.monthlyCost && formik.touched.monthlyCost && errorSpan(t(formik.errors.monthlyCost))}
                                        </label>
                                        <NumberFormat thousandSeparator={' '}
                                            id="monthlyCost"
                                            name="monthlyCost"
                                            placeholder={t('fill')}
                                            type="text"
                                            onValueChange={val => formik.setFieldValue('monthlyCost', val.floatValue)}
                                            value={formik.values.monthlyCost}
                                        />
                                    </div>
                                </div>
                                <div className="input-row">
                                    <div className="input-container">
                                        <label>
                                            {t('goal_header')}<Modal title={t('d_goal_title')} desc={t('d_goal')} setDefaultVisible={true}/>
                                            {formik.errors.goal && formik.touched.goal && errorSpan(t(formik.errors.goal))}
                                        </label>
                                        <NumberFormat thousandSeparator={' '}
                                            id="goal"
                                            name="goal"
                                            placeholder={t('goal_placeholder')}
                                            type="text"
                                            onValueChange={val => formik.setFieldValue('goal', val.floatValue)}
                                            value={formik.values.goal}
                                        />
                                        <span className="mini-info">{t('goal_info')}</span>
                                    </div>
                                    <div className="input-container">
                                        <label>
                                            {t('investments_interest_rate')}<Modal title={t('d_interest_title')} desc={t('d_interest')} setDefaultVisible={true}/>
                                            {formik.errors.interestRate && formik.touched.interestRate && errorSpan(t(formik.errors.interestRate))}
                                        </label>
                                        <input
                                            id="interestRate"
                                            name="interestRate"
                                            placeholder={t('fill')}
                                            type="number"
                                            onChange={formik.handleChange}
                                            value={formik.values.interestRate}
                                        />
                                    </div>
                                </div>
                                {apiError && (
                                    <div className="text-center">
                                        <label className="error">{t(apiError)}</label>
                                    </div>
                                )}
                                <div className="button-wrapper">
                                    <div className="button button__register" id="submitTargetValues" style={{ textAlign: "center" }} onClick={formik.submitForm}>
                                            <label>{fetching ? <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" /> : t('show_estimate')} </label>
                                        </div>
                                </div>
                                <div className="p-y">
                                    <span className="mini-info">{t('calc_info')}</span>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="calculator-result">
                            <div className="graph-container">
                                <div className="graph-header">
                                  <p>
                                      {`${t('result_goal_is')} ${fiRe? t('result_fire') : ""} ${formatMoney(report.goal)} ${t('result_pre_text')} ${formatDate(report.goalDate)}.`}
                                      {`${t('resultRemaining')} ${report.fullYears ? report.fullYears : ""} ${report.fullYears ? t('after_year') : ""}
                                      ${report.months} ${t('after_month')}`}
                                  </p>
                                </div>
                            </div>
                            <ReportVisual report={report}/>
                            <div className="info-row">
                                <label className="result-text">{t('result_now')}</label>
                                <label className="result-num">{formatMoney(report.currentInvestments)}</label>
                            </div>
                            <div className="info-row">
                                <label className="result-text">{t('result_yearly')}</label>
                                <label className="result-num">{formatMoney(report.savingsTotal)}</label>
                            </div>
                            <div className="info-row">
                                <label className="result-text">{t('result_estimated_growth')}</label>
                                <label className="result-num">{formatMoney(report.returnOnInvestment)}</label>
                            </div>
                            <div className="info-row b-y">
                                <label className="result-text">{t('result_total') + formatDate(report.goalDate)}</label>
                                <label className="result-num">{formatMoney(report.currentInvestments + report.savingsTotal + report.returnOnInvestment)}</label>
                            </div>
                            {joinCta &&
                                <div className="info-row">
                                    <p className="join-now">
                                        {t('result_join_now')}
                                        <Link to="/#dream">{t('result_join_link')}</Link>
                                        .
                                    </p>
                                </div>
                            }
                           <div className="button-wrapper">
                                <div className="button button__return" style={{ textAlign: "center" }} onClick={returnToForm}>
                                    <label>{t('edit_info')}</label>
                                </div>
                            </div>
                            <div className="info-row">
                                <label className="mini">{t('calc_info')}{t('calc_info_details')}<a href="https://www.mrmoneymustache.com/2012/05/29/how-much-do-i-need-for-retirement/"> 4% Rule </a></label>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );

    return (
        <div>{form}</div>
    );
};

export default TargetCalculator;
