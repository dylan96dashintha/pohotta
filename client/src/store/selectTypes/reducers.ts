import { SelectTypesState, SET_ACCOUNT_TYPES, SET_TRANSACTION_TYPES, SET_BALANCE_ACCOUNTS, SelectTypesActionTypes } from "./types";

const initialState: SelectTypesState = {
    accountTypes: [
        {
            "value": 0,
            "displayValue": "Virhe"
        }
    ],
    transactionTypes: [
        {
            "value": 0,
            "displayValue": "Virhe"
        }
    ],
    balanceAccounts: [
        {
            "value": 0,
            "displayValue": "Virhe"
        }
    ],
} //todo make initialstate empty

export function selectTypesReducer(
    state = initialState,
    action: SelectTypesActionTypes
): SelectTypesState {

    switch (action.type) {
        case SET_ACCOUNT_TYPES:
            return {...state, accountTypes: action.payload.data.data}
        case SET_TRANSACTION_TYPES:
            return { ...state, transactionTypes: action.payload.data.data }
        case SET_BALANCE_ACCOUNTS:
            return { ...state, balanceAccounts: action.payload.data.data }
        default:
            return state;

    }
}