import { BalancesState, ERROR_BALANCES_FETCHING, START_BALANCES_FETCHING, SET_BALANCES, BalancesActionTypes, AssistBoxActionTypes, SET_ASSISTBOX, AssistBoxState, AccountType } from "./types";
import { act } from "@testing-library/react";

const initialState: BalancesState = {

    fetching: false,
    fetchError: false
}

export function balancesReducer(
    state = initialState,
    action: BalancesActionTypes
): BalancesState {

    switch (action.type) {
        case ERROR_BALANCES_FETCHING:
            return {...state, fetchError: true, fetching:false }
        case START_BALANCES_FETCHING:
            return {...state, fetching: true}
        case SET_BALANCES:
            return {...state, fetching: false, balances: action.payload}
        case SET_ASSISTBOX:
            console.log("dddd",state);
            // const index = state.balances?.account_types.findIndex
            const index = 0
            const actTypes = state.balances ?  [...state.balances?.account_types] :[]
            actTypes[index] = {
                ...actTypes[index],
                //isOpen : true
            }
            
            console.log("act",actTypes);
            return state
            
        default:
            return state;

    }
}



// export function assistBoxReducer(
    
//     action: AssistBoxActionTypes
// ): AccountType {
//     switch(action.type) {
//         case SET_ASSISTBOX:
//             return {
                
            
            
//             }
        
//     }
// }

