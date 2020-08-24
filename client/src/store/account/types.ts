export interface TransactionsType {
    id:number,
    name:string,
    sum: number,
    account_id: number
}
export interface Transaction {
    id: number,
    description: string,
    date: string,
    amount: number,
    trans_type_id: number,
    trans_type_name: string,
    created_by: null,
    account_id: number
}
export interface TransactionsMonth {
    month_label: string,
    account_id: number,
    name: string,
    sum: number,
    sum_prev_m: number  | null,
    vs: number | null,
    prev_month_label: string | null,
    transaction_types: Array<TransactionsType>
    transactions: Array<Transaction>
}

export interface TransactionsState {
    data?: Array<TransactionsMonth>,
    fetching:boolean,
    fetchError:boolean
}

export interface DeleteBoxState {
    showDeleteBox: boolean
}

interface StartAccountTransactionsFetchingAction {
    type: typeof START_ACCOUNT_TRANSACTIONS_FETCHING
}
interface ErrorAccountTransactionsFetchingAction {
    type: typeof ERROR_ACCOUNT_TRANSACTIONS_FETCHING
}
interface SetAccountTransactionsAction {
    type: typeof SET_ACCOUNT_TRANSACTIONS,
    payload: any
}
interface SetShowDeleteBoxAction {
    type: typeof SET_DELETEBOX
}

interface SetCloseDeleteBoxAction {
    type: typeof CLOSE_DELETEBOX
}
export type AccountActionTypes = StartAccountTransactionsFetchingAction | ErrorAccountTransactionsFetchingAction | SetAccountTransactionsAction
export type DeleteBoxActionType = SetShowDeleteBoxAction | SetCloseDeleteBoxAction
export const SET_ACCOUNT_TRANSACTIONS = 'SET_ACCOUNT_TRANSACTIONS'
export const START_ACCOUNT_TRANSACTIONS_FETCHING = 'START_ACCOUNT_TRANSACTIONS_FETCHING'
export const ERROR_ACCOUNT_TRANSACTIONS_FETCHING = 'ERROR_ACCOUNT_TRANSACTIONS_FETCHING'
export const SET_DELETEBOX = 'SET_DELETEBOX'
export const CLOSE_DELETEBOX = 'CLOSE_DELETEBOX'