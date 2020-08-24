export interface SelectType {
    value: number,
    displayValue: string
}
export interface AccountType {
    [id: string]: {
        id: number,
        name: string,
        sum: number,
        sum_prev_m?: any,
        vs?: any,
        accounts: any,
        isOpen?: boolean
    }
    
}

export interface BalancesState {
    balances?: {
        sum: number,
        sum_prev_m?: any,
        vs?: any,
        account_types: Array<AccountType>,
        month_label?: string,
        prev_month_label?: string,
        

    },
    fetching:boolean,
    fetchError:boolean
}

export interface AssistBoxState {
    isAssistBoxOpen: boolean
    isOpen: boolean
}
interface StartBalancesFetchingAction {
    type: typeof START_BALANCES_FETCHING
}
interface ErrorBalancesFetchingAction {
    type: typeof ERROR_BALANCES_FETCHING
}
interface SetBalancesAction {
    type: typeof SET_BALANCES,
    payload: any
}
interface SetAssistBoxAction {
    type: typeof SET_ASSISTBOX,
    isOpen: boolean,
    key: number
}

export type BalancesActionTypes =  StartBalancesFetchingAction | ErrorBalancesFetchingAction | SetBalancesAction | SetAssistBoxAction
export type AssistBoxActionTypes = SetAssistBoxAction
export const SET_BALANCES = 'SET_BALANCES'
export const START_BALANCES_FETCHING = 'START_BALANCES_FETCHING'
export const ERROR_BALANCES_FETCHING = 'ERROR_BALANCES_FETCHING'
export const SET_ASSISTBOX = 'SET_ASSISTBOX'