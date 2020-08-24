import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

import "./Auth.scss";
import { AuthFormValues } from "./AuthFormValues";
import { loginAndRegisterThunk, resetPasswordThunk } from "../../store/auth/thunks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { resetAuthError } from "../../store/auth/actions";


const errorSpan = (message: string, className?: string) => {
    return <span className={`error ${className}`}>{message}</span>;
};
enum AuthSceneModes {
    Login = "login",
    SignUp = "register",
    ResetPassword = "resetpassword",
}

const Auth = () => {
    const { t } = useTranslation("auth");
    const selectErrors = (state: RootState) => state.auth.errors;
    const selectToken = (state: RootState) => state.auth.token;
    const selectMessage = (state: RootState) => state.auth.message;
    const selectFetching = (state: RootState) => state.auth.fetching;

    const errors = useSelector(selectErrors);
    const token = useSelector(selectToken);
    const message = useSelector(selectMessage);
    const fetching = useSelector(selectFetching);

    const getLoginString = (mode: AuthSceneModes): string => {
        switch (mode) {
            case AuthSceneModes.Login:
                return t("sign_in");
            case AuthSceneModes.SignUp:
                return t("register");
            case AuthSceneModes.ResetPassword:
                return t("reset_password");
        }
    }

    const validateAuth = (values: AuthFormValues, mode: AuthSceneModes) => {
        const errors: any = {};

        let checkPassword = true;
        if (mode === AuthSceneModes.ResetPassword) {
            checkPassword = false;
        }

        if (checkPassword) {
            if (!values.passw) {
                errors.passw = t("err_required");
            }
        }
        if (!values.email) {
            errors.email = t("err_required");
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = t("err_email");
        }

        return errors;
    };

    const initialValues: AuthFormValues = {
        email: "",
        passw: "",
    };
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            //   console.log(values)
            switch (sceneMode) {
                case AuthSceneModes.Login:
                    dispatch(loginAndRegisterThunk(values.email, values.passw, false));

                    break;
                case AuthSceneModes.SignUp:
                    dispatch(loginAndRegisterThunk(values.email, values.passw, true));

                    break;
                case AuthSceneModes.ResetPassword:
                    dispatch(resetPasswordThunk(values.email));
                    break;
            }
        },
        validate: (values) => {
            return validateAuth(values, sceneMode);
        },
    });

    const [sceneMode, setScenemode] = useState(AuthSceneModes.Login);
    const isModeLogin = sceneMode === AuthSceneModes.Login; //shorthand for register box
    const isModeResetPw = sceneMode === AuthSceneModes.ResetPassword;
    const modeString = getLoginString(sceneMode);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSceneChange = (mode:AuthSceneModes) => {
        setScenemode(mode)
        dispatch(resetAuthError())
    }

    useEffect(() => {
        if (errors.hasOwnProperty("inputErrors")) {
            formik.setErrors(errors.inputErrors!);
        }
    }, [errors, formik]);

    useEffect(() => {
        if (token) {
            //login ok, lets navigate to profile
            history.push("/record");
        }
    }, [token, history]);

    return (
        <div className="auth-container">
            <div className="row">
                <div className="auth-box">
                    <h1>{modeString}</h1>

                    <form onSubmit={() => formik.handleSubmit()}>
                        <div className="input-row">
                            <div className="input-container">
                                <label>
                                    {t('account')}
                                    {formik.errors.email && formik.touched.email && errorSpan(t(formik.errors.email))}
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    placeholder={t('account_placeholder')}
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    autoFocus={true}
                                />
                            </div>
                        </div>
                        {sceneMode !== AuthSceneModes.ResetPassword && (
                            <div className="input-row">
                                <div className="input-container">
                                    <label>
                                        {t('password')}
                                        {formik.errors.passw && formik.touched.passw && errorSpan(t(formik.errors.passw))}
                                    </label>
                                    <input
                                        id="passw"
                                        name="passw"
                                        placeholder={t('password_placeholder')}
                                        type="password"
                                        onChange={formik.handleChange}
                                        value={formik.values.passw}
                                    />
                                </div>
                            </div>
                        )}
                        <div className="button-wrapper">
                            <div className="button button__register" id="submitTargetValues" style={{ textAlign: "center" }} onClick={formik.submitForm}>
                                <label>{fetching ? <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" /> : modeString} </label>
                            </div>
                        </div>
                        {errors.hasOwnProperty("mainError") && !isModeResetPw && <label>{errorSpan(t(errors.mainError || "", "main-error"))}</label>}
                        {message && <label className="passwordreset-status">{message}</label>}
                    </form>
                    {isModeLogin && errors.hasOwnProperty("mainError") && (
                        <label className="reset-password" onClick={() => setScenemode(AuthSceneModes.ResetPassword)}>
                            {t('forgot_password')}
                        </label>
                    )}
                </div>
            </div>
            <section className="register-container">
                <h1 className="blue-header">{isModeLogin ? t('register_title') : t('signin_title')}</h1>
                <div className="button-wrapper">
                    <div
                        className="button button__register"
                        id="submitTargetValues"
                        style={{ textAlign: "center" }}
                        onClick={() => (isModeLogin ? handleSceneChange(AuthSceneModes.SignUp) : handleSceneChange(AuthSceneModes.Login))}
                    >
                        <label>{isModeLogin ? t('register') : t('sign_in')} </label>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default Auth;
