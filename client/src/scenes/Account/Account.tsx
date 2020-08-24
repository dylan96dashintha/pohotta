import React, { useState, useEffect, useLayoutEffect } from "react";

import { useHistory, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader/PageHeader";
import AssetBox from "../../components/AssetBox/AssetBox";
import FloatingRoundButton from "../../components/FloatingRoundButton/FloatingRoundButton";
import "./Account.scss";
import { RootState } from "../../store/index";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { fetchAccountTransactions, showDeleteBox } from "../../store/account/thunks";
import { executeRequest, DELETE_ACCOUNT_ENDPOINT, DELETE_TRANSACTION_ENDPOINT } from "../../store/request/thunks"
import { clearRequest } from "../../store/request/actions"
import { RequestKey } from "../../store/request/types"
import { fetchTransactionTypes, fetchBalanceAccounts } from "../../store/selectTypes/thunks";
import Delete from "../../common/icon/delete.svg";
import Edit from "../../common/icon/edit.svg";
import { formatVs } from "../../common/tools/helpers"
import { useTranslation } from 'react-i18next';
import { Transaction } from '../../store/account/types';
import Modal from "../../components/Modal/Modal";
import {Link} from "react-router-dom";



function formatSum(sum: number) {
    return new Intl.NumberFormat("fi-FI", { style: "currency", currency: "EUR" }).format(sum);
}

const Account = () => {
    const { t } = useTranslation('account');
    const [showAccountDeleteBox1, setShowAccountDeleteBox] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const { accountId } = useParams();
    const selectAccountTransactions = (state: RootState) => state.account.data;
    const selectRequests = (state: RootState) => state.request.requests;
    const transactions = useSelector(selectAccountTransactions);
    const requests = useSelector(selectRequests);


    const success = requests.deleteTransaction?.success ?? false;
    const deleteAccountSuccess = requests.deleteAccount?.success ?? false;


    useLayoutEffect(() => {
        let accId = Number(accountId);
        dispatch(fetchAccountTransactions(accId));
        dispatch(fetchTransactionTypes(accId));
        dispatch(fetchBalanceAccounts(accId));
    }, [dispatch, accountId]);

    useEffect(() => {
        if (success) {
            dispatch(clearRequest(RequestKey.deleteTransaction));
            
            //refetch data
            let accId = Number(accountId);
            dispatch(fetchAccountTransactions(accId));
            dispatch(fetchTransactionTypes(accId));
        }
    }, [success, accountId, dispatch]);

    useEffect(() => {
        if (deleteAccountSuccess) {
            dispatch(clearRequest(RequestKey.deleteAccount));
            history.push("/record");
        }
    }, [deleteAccountSuccess, history, dispatch])



    let latestAccount;

    if (transactions !== undefined) {
        latestAccount = transactions[transactions.length - 1];
    } else {
        latestAccount = {
            sum: 0,
            name: ''
        };
    }

    function deleteAccount() {
        let url = DELETE_ACCOUNT_ENDPOINT;
        url.urlParams = `/${accountId}`;
        dispatch(executeRequest(url));
    }
    function deleteTransaction(id: number) {
        let url = DELETE_TRANSACTION_ENDPOINT;
        url.urlParams = `/${id}`;
        dispatch(executeRequest(url));
    }
    function editTransaction(t: any) {
        history.push(`/transactionForm/${t.id}`, t);
    }
    function goBackHandle() {
        history.push("/record");
    }

    function showAccountDeleteBox() {
        dispatch(showDeleteBox());
        setShowAccountDeleteBox(true);
    }
    return (
        <>
            <p>
                    <Link className="breadcrumbs" to="/record">Record</Link>
                    <Link className="breadcrumbs" to={`/account/${accountId}`}>/ {latestAccount.name}</Link>
            </p>
            <PageHeader title={latestAccount.name} showIcon={true} editIconClickAction={() => history.push(`/accountForm/${accountId}`)} deleteIconClickAction={() => showAccountDeleteBox()}/>
             {showAccountDeleteBox && (
                
                <div className="verify-question-box">
                    <label>
                    <Modal title={t('confirm_account_delete')}  cancelText={t('cancel')} />
                   </label> 
                  
                </div>
            )} 
            {transactions !== undefined &&
            <section>

                <h2>{t('account_page_sub_title')}</h2>

                {transactions.map((account, index) => {
                return (
                <div key={'acc'+index}>
               <div className="month-summary">
                   <AssetBox account={{
                       totalSum: account.sum,
                       totalTitle: account.month_label,
                       differencePercent: formatVs(account.vs ?? 0),
                       differenceFrom: account.prev_month_label ?? ''
                   }}
                   />
                    <div className="month-summary-row">
                        <label className="bold">{account.month_label}</label>
                        <label className="bold">{formatSum(account.sum)}</label>
                    </div>
                    {account.transaction_types.map(type => {
                        return (<div className="month-summary-row" key={type.id}>
                            <label>{t(type.name)}</label>
                            <label>{formatSum(type.sum)}</label>
                        </div>)
                    })}
                    </div>
                <div className="event-container">
                    <div className="event-row header">
                        <label className="r1">{t('date')}</label>
                        <label className="r2">{t('description')}</label>
                        <label className="r3">{t('catergory')}</label>
                        <label className="r4">{t('amount')}</label>
                    </div>

                    {account.transactions.map((transaction:Transaction) => {
                        console.log(t);
                        return (
                            <div className="event-row income" key={transaction.id}>
                                <label className="r1">{moment(transaction.date, "YYYY-MM-DD").format("DD.MM.")}</label>
                                <label className="r2">{transaction.description}</label>
                                <label className="r3">{t(transaction.trans_type_name)}</label>
                                <label className="r4">{formatSum(transaction.amount)}<span className="icon" onClick={() => editTransaction(t)}><img src={Edit} alt="Delete"></img></span><span className="icon" onClick={() => deleteTransaction(transaction.id)}><img src={Delete} alt="Delete"></img></span></label>
                            </div>
                        );
                    })}
                </div>
                </div>
                )
                })
            }
                <FloatingRoundButton buttonAction={() => history.push("/transactionForm")} />
            </section>
}
        </>
    );
};

export default Account;
