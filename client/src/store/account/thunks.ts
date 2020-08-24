import axios from "../../common/tools/axios";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { TransactionsState, DeleteBoxState } from "./types"
import { setAccountTransactionsSuccess, startAccountTransactionsFetching, setAccountTransactionsError, setShowDeleteBox, setCloseDeleteBox } from "./actions"

export const fetchAccountTransactions = (accountId: number): ThunkAction<void, TransactionsState, unknown, Action<string>> => async (dispatch: any) => {

    const TRANSACTIONS_GET_PATH = `/transactions/account/${accountId}`

    dispatch(startAccountTransactionsFetching());

    axios.get(TRANSACTIONS_GET_PATH)
        .then(response => {
            console.log(response);

            const data: any = response.data.data
            dispatch(setAccountTransactionsSuccess(data));
        }).catch(error => {
            dispatch(setAccountTransactionsError());
        })

}

export const showDeleteBox = (): ThunkAction<void, DeleteBoxState, unknown, Action<string>> => async (dispatch: any) => {
    dispatch(setShowDeleteBox());
}

export const closeDeleteBox = (): ThunkAction<void, DeleteBoxState, unknown, Action<string>> => async (dispatch: any) => {
    dispatch(setCloseDeleteBox());
}