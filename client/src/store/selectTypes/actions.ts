import { SelectTypesActionTypes, SET_ACCOUNT_TYPES, AccountSelectTypesResponse, SET_TRANSACTION_TYPES, SET_BALANCE_ACCOUNTS } from "./types";


export function setAccountTypes(data: any): SelectTypesActionTypes {

    let accountTypesRes: AccountSelectTypesResponse = data;

    return {
        type: SET_ACCOUNT_TYPES,
        payload: accountTypesRes
    }

}

export function setTransactionTypes(data: any): SelectTypesActionTypes {

    let accountTypesRes: AccountSelectTypesResponse = data

    return {
        type: SET_TRANSACTION_TYPES,
        payload: accountTypesRes
    }

}

export function setBalanceAccounts(data: any): SelectTypesActionTypes {

let accountTypesRes: AccountSelectTypesResponse = data

return {
    type: SET_BALANCE_ACCOUNTS,
    payload: accountTypesRes
}

}
