import { BalancesState,Balances, ERROR_BALANCES_FETCHING, START_BALANCES_FETCHING, SET_BALANCES, BalancesActionTypes, AssistBoxActionTypes, SET_ASSISTBOX, AssistBoxState, AccountType } from "./types";
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
            const excistingBalances = state.balances ? {...state.balances} : {}
            return {...state, fetching: false, balances: { ...excistingBalances, ...action.payload }}
        case SET_ASSISTBOX:
            console.log("dddd",state);
            // const index = state.balances?.account_types.findIndex(acc => acc.id === action.id)
            const index = action.index
            const balances: Balances = { ...state.balances }
            
            if(balances && balances.account_types){
                const acctType = { 
                    ...balances.account_types[index]
                }

                balances.account_types = [ ...balances.account_types ]

                balances.account_types[index] = { 
                    ...acctType,
                    isOpen : !acctType.isOpen
                }

                // console.log('balances.account_types[index].isOpen', balances.account_types[index].isOpen)
            }

            console.log('balances....', balances )

            return { 
                ...state,
                balances,
            }
            
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

