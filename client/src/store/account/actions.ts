import { AccountActionTypes, SET_ACCOUNT_TRANSACTIONS, ERROR_ACCOUNT_TRANSACTIONS_FETCHING, START_ACCOUNT_TRANSACTIONS_FETCHING, DeleteBoxActionType, SET_DELETEBOX, CLOSE_DELETEBOX } from "./types";


export function setAccountTransactionsSuccess(data: any): AccountActionTypes {

    return {
        type: SET_ACCOUNT_TRANSACTIONS,
        payload: data
    }

}

export function setAccountTransactionsError(): AccountActionTypes {
    return {
        type: ERROR_ACCOUNT_TRANSACTIONS_FETCHING
    }
}
export function startAccountTransactionsFetching(): AccountActionTypes {
    return {
        type: START_ACCOUNT_TRANSACTIONS_FETCHING
    }
}

export function setShowDeleteBox(): DeleteBoxActionType {
    return {
        type: SET_DELETEBOX
    }
}

export function setCloseDeleteBox(): DeleteBoxActionType {
    return {
        type: CLOSE_DELETEBOX
    }
}