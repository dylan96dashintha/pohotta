import React, { useEffect } from "react";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

import "./TransactionForm.scss";
import { TransactionFormValues } from "./TransactionFormValues";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/index";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { TextField } from "@material-ui/core";
import moment from "moment";
import FooterNavigation from "../../components/FooterNavigation/FooterNavigation";
import { executeRequest, POST_TRANSACTION_ENDPOINT, PATCH_TRANSACTION_ENDPOINT } from "../../store/request/thunks";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { clearRequest } from "../../store/request/actions";
import { useTranslation } from 'react-i18next';
import {Link} from "react-router-dom";

const errorSpan = (message: string) => {
    return <span className="error">{message}</span>;
};

const TransactionForm = () => {
    const { t } = useTranslation("transactionForm");
    const { transactionId } = useParams();
    const editMode = transactionId !== undefined;

    const selectRequests = (state: RootState) => state.request.requests;
    const selectTransactionTypes = (state: RootState) => state.selectTypes.transactionTypes;
    const selectBalanceAccounts = (state: RootState) => state.selectTypes.balanceAccounts;
    const selectCustomerId = (state: RootState) => state.auth.customer_id;
    const selectAccountData = (state: RootState) => state.account.data;

    const requests = useSelector(selectRequests);
    const reqKey = editMode ? PATCH_TRANSACTION_ENDPOINT.key : POST_TRANSACTION_ENDPOINT.key;
    const errors = requests[reqKey]?.errors ?? {};
    const success = requests[reqKey]?.success ?? false;
    const editModeSuccess = requests.patchTransaction?.success ?? false;
    const loading = requests[reqKey]?.loading ?? false;
    const transactionTypes = useSelector(selectTransactionTypes);
    const balanceAccounts = useSelector(selectBalanceAccounts);
    const customerId = useSelector(selectCustomerId);
    const accountData = useSelector(selectAccountData);
    let cust_account_name = accountData !== undefined ? accountData[0].name : -1;
    let custId = accountData !== undefined ? accountData[0].account_id : -1;
    console.log(transactionId);

    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();

    const editableTransaction: any = location.state;

    const validateTransactionForm = (values: TransactionFormValues) => {
        const errors: any = {};

        if (!values.description) {
            errors.description = t('err_required');
        }
        if (!values.amount) {
            errors.amount = t('err_required');
        }
        // console.log(errors);
        return errors;
    };

    let initialValues: TransactionFormValues = {
        transaction_type_id: transactionTypes[0].value,
        description: "",
        amount: undefined,
        date: moment().format("YYYY-MM-DD"),
        transfer_direction: false,
        balance_account_id: balanceAccounts && balanceAccounts[0] && balanceAccounts[0].value,
    };

    if (editableTransaction !== null && editMode) {
        initialValues = {
            transaction_type_id: transactionTypes[0].value,
            description: editableTransaction.description,
            amount: editableTransaction.amount,
            date: moment(editableTransaction.date, "YYYY-MM-DD").format("YYYY-MM-DD"),
            transfer_direction: false,
            balance_account_id: undefined,
        };
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            let cust_account_id = accountData !== undefined ? accountData[0].account_id : -1;

            if (editMode) {
                let data = {
                    id: Number(transactionId),
                    customer_id: customerId,
                    description: values.description,
                    amount: values.amount,
                    date: moment(values.date, "YYYY-MM-DD").format("YYYY-MM-DDT00:00:00.000") + "Z",
                    category_id: null,
                    transfer_direction: null,
                };

                let patchEp = PATCH_TRANSACTION_ENDPOINT;
                patchEp.urlParams = `/${transactionId}`;
                dispatch(executeRequest(patchEp, data));
            } else {
                let data;
                if (transferMode) {
                    //in = true, out = false
                    let transfer_direction = isInSelected ? "in" : "out";
                    data = {
                        customer_id: customerId,
                        description: values.description,
                        transaction_type_id: Number(values.transaction_type_id),
                        amount: values.amount,
                        date: moment(values.date, "YYYY-MM-DD").format("YYYY-MM-DDT00:00:00.000") + "Z",
                        cust_account_id: cust_account_id,
                        category_id: null,
                        transfer_direction: transfer_direction,
                        balance_account_id: Number(values.balance_account_id),
                    };
                } else {
                    data = {
                        customer_id: customerId,
                        description: values.description,
                        transaction_type_id: Number(values.transaction_type_id),
                        amount: values.amount,
                        date: moment(values.date, "YYYY-MM-DD").format("YYYY-MM-DDT00:00:00.000") + "Z",
                        cust_account_id: cust_account_id,
                        category_id: null,
                        transfer_direction: null,
                        balance_account_id: null,
                    };
                }

                console.log(data);

                dispatch(executeRequest(POST_TRANSACTION_ENDPOINT, data));
            }
        },
        validate: (values) => {
            return validateTransactionForm(values);
        },
    });

    const isOutSelected = formik.values.transfer_direction === true;
    const isInSelected = formik.values.transfer_direction === false;
    const transferMode = Number(formik.values.transaction_type_id) === 3;

    useEffect(() => {
        if (errors.hasOwnProperty("inputErrors")) {
            console.log(errors.inputErrors);
            formik.setErrors(errors.inputErrors!);
        }
    }, [errors, formik]);

    useEffect(() => {
        if (editMode) {
            if (editModeSuccess) {
                dispatch(clearRequest(PATCH_TRANSACTION_ENDPOINT.key));
                history.goBack();
            }
        } else if (success) {
            dispatch(clearRequest(POST_TRANSACTION_ENDPOINT.key));
            history.goBack();
        }
    }, [success, editModeSuccess, history, dispatch, editMode]);

    return (
        
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <div className="page-container">
            <div className="braithwaite">
                    <Link className="breadcrumbs" to="/record">Record</Link>
                    <Link className="breadcrumbs" to={`/account/${custId}`}>/ {cust_account_name}</Link>
                    <Link className="breadcrumbs" to={`/transactionForm`}>/ {t('new_transaction')}</Link>
            </div>
                <div className="form-container">
                    <div className="row">
                        <div className="auth-box">
                            <h1>{editMode ? t('edit_transaction') : t('new_transaction')}</h1>

                            <form onSubmit={() => formik.handleSubmit()}>
                                {!editMode && (
                                    <div className="input-row">
                                        <div className="input-container">
                                            <label>{t('transaction_type_label')}</label>
                                            <select
                                                id="transaction_type_id"
                                                name="transaction_type_id"
                                                value={formik.values.transaction_type_id}
                                                onChange={formik.handleChange}
                                            >
                                                {transactionTypes.map((option) => {
                                                    return <option value={option.value} key={option.value} label={t(option.displayValue)}></option>;
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                )}

                                {!editMode && transferMode && (
                                    <div className="input-row">
                                        <div className="input-container">
                                            <label>{t('transaction_type_label')}</label>
                                            <select
                                                id="balance_account_id"
                                                name="balance_account_id"
                                                value={formik.values.balance_account_id}
                                                onChange={formik.handleChange}
                                            >
                                                {balanceAccounts.map((option) => {
                                                    return <option value={option.value} key={option.value} label={t(option.displayValue)}></option>;
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                )}
                                {!editMode && transferMode && (
                                    <div className="input-row">
                                        <div className="input-container">
                                            <label>
                                                {t('input_type_label')}
                                                {formik.errors.transfer_direction &&
                                                    formik.touched.transfer_direction &&
                                                    errorSpan(t(formik.errors.transfer_direction))}
                                            </label>

                                            <div className="select-container">
                                                <div
                                                    className={isOutSelected ? "item selected" : "item"}
                                                    onClick={() => formik.setFieldValue("transfer_direction", true)}
                                                >
                                                    <label className="select-label">{t('direction_out')}</label>
                                                </div>
                                                <div
                                                    className={isInSelected ? "item selected" : "item"}
                                                    onClick={() => formik.setFieldValue("transfer_direction", false)}
                                                >
                                                    <label className="select-label">{t('direction_in')}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="input-row">
                                    <div className="input-container">
                                        <label>
                                            {t('transaction_description_label')}
                                            {formik.errors.description && formik.touched.description && errorSpan(t(formik.errors.description))}
                                        </label>
                                        <input
                                            id="description"
                                            name="description"
                                            placeholder={t('transaction_description_label')}
                                            type="text"
                                            onChange={formik.handleChange}
                                            value={formik.values.description}
                                        />
                                    </div>
                                </div>
                                <div className="input-row">
                                    <div className="input-container">
                                        <label>{t('date_label')}</label>

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

                                <div className="input-row">
                                    <div className="input-container">
                                        <label>
                                            {t('amount_label')}
                                            {formik.errors.amount && formik.touched.amount && errorSpan(t(formik.errors.amount))}
                                        </label>
                                        <input
                                            id="amount"
                                            name="amount"
                                            placeholder={t('amount_label')}
                                            type="number"
                                            onChange={formik.handleChange}
                                            value={formik.values.amount || ""}
                                        />
                                    </div>
                                </div>

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
        </MuiPickersUtilsProvider>
    );
};
export default TransactionForm;
