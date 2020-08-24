export interface SelectType {
    value: number,
    displayValue: string
}

export interface SelectTypesState {
    accountTypes: Array<SelectType>
    transactionTypes: Array<SelectType>
    balanceAccounts: Array<SelectType>
}

interface SetTypesAction {
    type: typeof SET_ACCOUNT_TYPES
    payload: AccountSelectTypesResponse
}

interface SetTransactionTypesAction {
    type: typeof SET_TRANSACTION_TYPES
    payload: AccountSelectTypesResponse
}

interface SetBalanceAccountsAction {
    type: typeof SET_BALANCE_ACCOUNTS
    payload: AccountSelectTypesResponse
}

export interface AccountSelectTypesResponse {
    message: string,
    statusCode: number,
    data: {
        data: Array<SelectType>
    }
}

export type SelectTypesActionTypes = SetTypesAction | SetTransactionTypesAction | SetBalanceAccountsAction

export const SET_ACCOUNT_TYPES = 'SET_ACCOUNT_TYPES'
export const SET_TRANSACTION_TYPES = 'SET_TRANSACTION_TYPES'
export const SET_BALANCE_ACCOUNTS = 'SET_BALANCE_ACCOUNTS'