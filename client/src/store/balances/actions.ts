import { BalancesActionTypes, SET_BALANCES, ERROR_BALANCES_FETCHING, START_BALANCES_FETCHING, AssistBoxActionTypes, SET_ASSISTBOX } from "./types";


export function setBalancesSuccess(data: any): BalancesActionTypes {
    console.log("data",data);
    return {
        type: SET_BALANCES,
        payload: data
        
    }

}

export function setBalancesError(): BalancesActionTypes {
    return {
        type: ERROR_BALANCES_FETCHING
    }
}
export function startBalancesFetching(): BalancesActionTypes {
    return {
        type: START_BALANCES_FETCHING
    }
}

export function showAssistBox(isOpen: boolean,index: number): BalancesActionTypes {
    return {
        type: SET_ASSISTBOX,
        isOpen: isOpen,
        index
    }
}