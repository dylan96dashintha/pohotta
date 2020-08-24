import { SET_DELETEBOX,DeleteBoxActionType,DeleteBoxState,TransactionsState, AccountActionTypes, SET_ACCOUNT_TRANSACTIONS, START_ACCOUNT_TRANSACTIONS_FETCHING, CLOSE_DELETEBOX } from "./types";

const initialState: TransactionsState =
{
        fetchError: false,
        fetching: false
}

export function accountReducer(
    state = initialState,
    action: AccountActionTypes
): TransactionsState {

    switch (action.type) {
        default:
            return state;
        case SET_ACCOUNT_TRANSACTIONS:
            return {...state, data: action.payload}
        case START_ACCOUNT_TRANSACTIONS_FETCHING:
            return {...initialState, fetching: true}

    }
}

const initialStat: DeleteBoxState =
{
    showDeleteBox: false
}
export function deleteBoxReducer(
    state = initialStat,
    action:  DeleteBoxActionType
): DeleteBoxState {
    switch(action.type) {
        default:
            return state;
        case SET_DELETEBOX:
            return {...initialStat, showDeleteBox: true}
        case CLOSE_DELETEBOX:
            return {...initialStat, showDeleteBox: false}
            
    }
}
