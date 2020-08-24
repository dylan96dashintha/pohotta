import React, { Fragment, useState } from "react";
import { useFormik } from "formik";
import strings from "./strings";
import axios from "../../common/tools/axios";
import handleError from '../../common/tools/apiErrorHandler'

import "./Invite.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import {validate} from '../../common/tools/helpers';

const Invite = () => {
    
    const [apiError, setApiError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState<boolean>(true);
    const [fetching, setFetching] = useState<boolean>(false);
    const errorSpan = (message:string) => { return <span className="error">{message}</span>; }

    const formik = useFormik({
        initialValues: {
            email: "",
            subscription: "",
            important: "",
            issue: "",
            solution: ""
        },
        validate,
        onSubmit: values => {
            setApiError(null);
            setFetching(true);
            const data = {
                email: values.email,
                subscription: values.subscription,
                important: values.important,
                issue: values.issue,
                solution: values.solution
            };
            // console.log(data);
            axios
                .post("/landing-page/join-invite-list", data)
                .then(response => {
                    setShowForm(false);
                    setFetching(false);
                })
                .catch(error => {
                    setFetching(false);
                    if (error.response) {
                        const errRes = error.response;
                        if (errRes.hasOwnProperty("data")) {
                            if (errRes.data.hasOwnProperty("message")) {
                                const errors = handleError(errRes.data)
                                if (errors.hasOwnProperty('mainError')) {
                                    setApiError(errors.mainError);
                                }
                                if (errors.hasOwnProperty('inputErrors')) {
                                    formik.setErrors(errors.inputErrors)
                                }
                            }
                        } 
                    // Api not running error     
                    } else {
                        setApiError(strings.e_api_not_running);  
                    }
                });
        }
    });

    const form = (
      <Fragment>
            <div className="invite-container" id="invite">
                <div className="content">
                    {showForm ? (
                        <div>
                            <h2 className="second">{strings.invite_form_header}</h2>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="input-row">
                                    <div className="input-container">
                                        <label>
                                            {strings.email_header}
                                            {formik.errors.email && formik.touched.email && errorSpan(formik.errors.email)}
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            placeholder={strings.email_header}
                                            type="email"
                                            onChange={formik.handleChange}
                                            value={formik.values.email}
                                        />
                                    </div>
                                </div>
                                <div className="input-row">
                                    <div className="input-container">
                                        <p className="label-p">
                                            {strings.select_subscription}
                                            {formik.errors.subscription && formik.touched.subscription && errorSpan(formik.errors.subscription)}
                                        </p>
                                        <div className="radio">
                                            <label>
                                                {strings.subscription_basic_header}
                                            </label>
                                            <input
                                                id="subscription"
                                                name="subscription"
                                                placeholder={strings.enter_placeholder}
                                                type="radio"
                                                onChange={formik.handleChange}
                                                value="basic"
                                            />
                                            <label>
                                                {strings.subscription_vip_header}
                                            </label>
                                            <input
                                                id="subscription"
                                                name="subscription"
                                                placeholder={strings.enter_placeholder}
                                                type="radio"
                                                onChange={formik.handleChange}
                                                value="VIP"
                                            />
                                        </div>
                                        <div className="mini-info-container">
                                            <span className="mini-info">{strings.price_after}</span>
                                            <span className="mini-info">{strings.prices}</span>
                                        </div>
                                    </div>
                                </div>    
                                <div className="input-row">
                                    <div className="input-container">
                                        <label>
                                            {strings.extra}
                                            {formik.errors.important && formik.touched.important && errorSpan(formik.errors.important)}
                                        </label>
                                        <textarea
                                            id="important"
                                            name="important"
                                            placeholder={strings.important_header}
                                            rows={2}
                                            onChange={formik.handleChange}
                                            value={formik.values.important}
                                        />
                                    </div>
                                </div>
                                <div className="input-row">
                                    <div className="input-container">
                                        <label>
                                            {/* {strings.issue_header} */}
                                            {formik.errors.issue && formik.touched.issue && errorSpan(formik.errors.issue)}
                                        </label>
                                        <textarea
                                            id="issue"
                                            name="issue"
                                            placeholder={strings.issue_header}
                                            rows={2}
                                            onChange={formik.handleChange}
                                            value={formik.values.issue}
                                        />
                                    </div>
                                </div>
                                <div className="input-row">
                                    <div className="input-container">
                                        <label>
                                            {/* {strings.solution_header} */}
                                            {formik.errors.solution && formik.touched.solution && errorSpan(formik.errors.solution)}
                                        </label>
                                        <textarea
                                            id="solution"
                                            name="solution"
                                            placeholder={strings.solution_header}
                                            rows={2}
                                            onChange={formik.handleChange}
                                            value={formik.values.solution}
                                        />
                                    </div>
                                </div>
    
                                
                                {apiError && (
                                    <div className="text-center">
                                        <label className="error">{apiError}</label>
                                    </div>
                                )}
                                <div className="button-wrapper">
                                    <div className="button button__signup" id="submitTargetValues" style={{ textAlign: "center" }} onClick={formik.submitForm}>
                                            <label>{fetching ? <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" /> : strings.join} </label>
                                        </div>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="invite-result">
                            <div className="invite-welcome">
                                <h2 className="success">{strings.welcome_header}</h2>
                                <p className="success">{strings.welcome}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );

    return (
        <>{form}</>
    );
};

export default Invite;
