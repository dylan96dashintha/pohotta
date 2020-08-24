import axios from "../../common/tools/axios";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { SelectTypesState } from './types';
import { setAccountTypes, setTransactionTypes, setBalanceAccounts } from "./actions"

export const fetchAccountTypes = (): ThunkAction<Promise<any>, SelectTypesState, unknown, Action<string>> => async (dispatch:any):Promise<any> => {
    const ACCOUNT_TYPE_PATH = "/accounts/types"

    return axios.get(ACCOUNT_TYPE_PATH)
        .then(response => {
            // console.log(response)
            dispatch(setAccountTypes(response.data))
        }).catch(error => {
            //todo
        })

};

export const fetchTransactionTypes = (accountId:number): ThunkAction<Promise<any>, SelectTypesState, unknown, Action<string>> => async (dispatch: any): Promise<any> => {
    const TRANSACTION_TYPE_PATH = `/accounts/${accountId}/transaction-types`

    return axios.get(TRANSACTION_TYPE_PATH)
        .then(response => {
             console.log(response)
            dispatch(setTransactionTypes(response.data))
        }).catch(error => {
            //todo
        })

};

export const fetchBalanceAccounts = (accountId: number): ThunkAction<Promise<any>, SelectTypesState, unknown, Action<string>> => async (dispatch: any): Promise<any> => {
    const BALANCE_ACCOUNT_PATH = `/accounts/balance-accounts/${accountId}`

    return axios.get(BALANCE_ACCOUNT_PATH)
        .then(response => {
            console.log(response)
            dispatch(setBalanceAccounts(response.data))
        }).catch(error => {
            //todo
        })

};