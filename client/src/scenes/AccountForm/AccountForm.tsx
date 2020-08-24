import React, { useEffect, useLayoutEffect } from "react";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

import "./AccountForm.scss";
import { AccountFormValues } from "./AccountFormValues";
import FooterNavigation from "../../components/FooterNavigation/FooterNavigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { useHistory, useParams } from "react-router-dom";
import { executeRequest, GET_ACCOUNT_ENDPOINT, POST_ACCOUNT_ENDPOINT, PATCH_ACCOUNT_ENDPOINT } from "../../store/request/thunks";
import { RequestKey } from "../../store/request/types";
import { TextField } from "@material-ui/core";
import moment from "moment";
import {Link} from "react-router-dom";
import { clearRequest } from "../../store/request/actions";
import { useTranslation } from 'react-i18next';

const errorSpan = (message: string) => {
    return <span className="error">{message}</span>;
};

const AccountForm = () => {
    const { t } = useTranslation("accountForm");
    const { accountId } = useParams();
    const editMode = accountId !== undefined;
    const requestKey = editMode ? PATCH_ACCOUNT_ENDPOINT.key : POST_ACCOUNT_ENDPOINT.key;

    const history = useHistory();
    const dispatch = useDispatch();

    const selectRequests = (state: RootState) => state.request.requests;

    const selectAccountTypes = (state: RootState) => state.selectTypes.accountTypes;
    const requests = useSelector(selectRequests);

    const errors = requests[requestKey]?.errors ?? {};
    const success = requests.postAccount?.success ?? false;
    const editModeSuccess = requests.patchAccount?.success ?? false;
    const loading = requests.postAccount?.loading ?? false;
    const getAccountSuccess = requests.getAccount?.success ?? false;

    const accountTypes = useSelector(selectAccountTypes);

    const validateAccountForm = (values: AccountFormValues) => {
        const errors: any = {};

        if (!values.description) {
            errors.description = t('err_required');
        }
        if (!values.balance && !editMode) {
            errors.balance = t('err_required');
        }

        console.log(errors);

        return errors;
    };

    const initialValues: AccountFormValues = {
        account_type_id: accountTypes[0].value,
        description: "",
        is_balance_mode: false,
        balance: undefined,
        date: moment().format("YYYY-MM-DD"),
    };
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            console.log(values);
            if (editMode) {
                let data = {
                    id: Number(accountId),
                    description: values.description,
                    is_balance_mode: String(values.is_balance_mode),
                };
                let patchEp = PATCH_ACCOUNT_ENDPOINT;
                patchEp.urlParams = `/${accountId}`;
                dispatch(executeRequest(patchEp, data));
            } else {
                let data = {
                    description: values.description,
                    is_balance_mode: String(values.is_balance_mode),
                    account_type_id: Number(values.account_type_id),
                    date: moment(values.date, "YYYY-MM-DD").format("YYYY-MM-DDT00:00:00.000") + "Z",
                    balance: values.balance,
                };
                dispatch(executeRequest(POST_ACCOUNT_ENDPOINT, data));
            }
        },
        validate: (values) => {
            return validateAccountForm(values);
        },
    });

    const isBalanceSelected = formik.values.is_balance_mode === true;
    const isExpensesSelected = formik.values.is_balance_mode === false;

    useEffect(() => {
        if (errors.hasOwnProperty("inputErrors")) {
            formik.setErrors(errors.inputErrors!);
        }
    }, [errors, formik]);

    useEffect(() => {
        if (editMode) {
            if (editModeSuccess) {
                dispatch(clearRequest(RequestKey.patchAccount));
                history.goBack();
            }
        } else if (success) {
            dispatch(clearRequest(RequestKey.postAccount));
            history.push("/record");
        }
    }, [success, editModeSuccess, history, dispatch, editMode]);

    useLayoutEffect(() => {
        if (editMode) {
            let ep = GET_ACCOUNT_ENDPOINT;
            ep.urlParams = `/${accountId}`;
            dispatch(executeRequest(GET_ACCOUNT_ENDPOINT));
        }
    }, [editMode, accountId, dispatch]);
    useEffect(() => {
        if (getAccountSuccess) {
            let { description, is_balance_mode } = requests.getAccount.data;
            if (formik.values.description === "") {
                formik.setFieldValue("description", description);
                formik.setFieldValue("is_balance_mode", is_balance_mode);
            }
        }
    }, [getAccountSuccess, formik, requests]);

    return (
        <div className="page-container">
            <div className="braithwaite">
                    <Link className="breadcrumbs" to="/record">Record</Link>
                    <Link className="breadcrumbs" to={`/accountForm`}>/ {editMode ? t('edit_account') : t('add_account')}</Link>
                  
            </div>
            <div className="form-container">
                <div className="row">
                    <div className="auth-box">
                        <h1>{editMode ? t('edit_account') : t('add_account')}</h1>

                        <form onSubmit={() => formik.handleSubmit()}>
                            <div className="input-row">
                                <div className="input-container">
                                    <label>
                                        {t('account_description')}
                                        {formik.errors.description && formik.touched.description && errorSpan(t(formik.errors.description))}
                                    </label>
                                    <input
                                        id="description"
                                        name="description"
                                        placeholder={t('account_description')}
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.description}
                                    />
                                </div>
                            </div>
                            {!editMode && (
                                <div className="input-row">
                                    <div className="input-container">
                                        <label>
                                            {t('current_balance')}
                                            {formik.errors.balance && formik.touched.balance && errorSpan(t(formik.errors.balance))}
                                        </label>
                                        <input
                                            id="balance"
                                            name="balance"
                                            placeholder={t('current_balance')}
                                            type="number"
                                            onChange={formik.handleChange}
                                            value={formik.values.balance || ""}
                                        />
                                    </div>
                                </div>
                            )}
                            {!editMode && (
                                <div className="input-row">
                                    <div className="input-container">
                                        <label>
                                            {t('current_balance_date')}
                                            {formik.errors.date && formik.touched.date && errorSpan(t(formik.errors.date))}
                                        </label>

                                        <TextField
                                            id="date"
                                            type="date"
                                            defaultValue={formik.values.date}
                                            onChange={(val) => formik.setFieldValue("date", val.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                            <div className="input-row">
                                <div className="input-container">
                                    <label>
                                        {t('input_type')}
                                        {formik.errors.is_balance_mode && formik.touched.is_balance_mode && errorSpan(t(formik.errors.is_balance_mode))}
                                    </label>

                                    <div className="select-container">
                                        <div
                                            className={isBalanceSelected ? "item selected" : "item"}
                                            onClick={() => formik.setFieldValue("is_balance_mode", true)}
                                        >
                                            <label className="select-label">{t('balance_mode_balance')}</label>
                                        </div>
                                        <div
                                            className={isExpensesSelected ? "item selected" : "item"}
                                            onClick={() => formik.setFieldValue("is_balance_mode", false)}
                                        >
                                            <label className="select-label">{t('balance_mode_cost')}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {!editMode && (
                                <div className="input-row">
                                    <div className="input-container">
                                        <label>
                                            {t('account_type')}
                                            {formik.errors.account_type_id && formik.touched.account_type_id && errorSpan(t(formik.errors.account_type_id))}
                                        </label>
                                        <select
                                            id="account_type_id"
                                            name="account_type_id"
                                            value={formik.values.account_type_id}
                                            onChange={formik.handleChange}
                                        >
                                            {accountTypes.map((option) => {
                                                return <option value={option.value} key={option.value} label={t(option.displayValue)}></option>;
                                            })}
                                        </select>
                                    </div>
                                </div>
                            )}

                            <div className="button-wrapper">
                                <div className="button button__register" id="submitTargetValues" style={{ textAlign: "center" }} onClick={formik.submitForm}>
                                    <label>{loading ? <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" /> : t('save')} </label>
                                </div>
                            </div>
                            {errors.hasOwnProperty("mainError") && <label>{errorSpan(t(errors.mainError || ""))}</label>}
                        </form>
                    </div>
                </div>
            </div>
            <FooterNavigation />
        </div>
    );
};
export default AccountForm;
