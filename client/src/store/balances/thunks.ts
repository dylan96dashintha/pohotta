import axios from "../../common/tools/axios";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { BalancesState, AssistBoxState, AccountType } from "./types"
import { setBalancesSuccess, startBalancesFetching, setBalancesError, showAssistBox } from "./actions"

export const fetchBalances = (): ThunkAction<void, BalancesState, unknown, Action<string>> => async (dispatch: any) => {

    const ACCOUNT_TYPE_PATH = "/accounts/balances"

    dispatch(startBalancesFetching());

    axios.get(ACCOUNT_TYPE_PATH)
        .then(response => {
            console.log(response);
            // Latest month is always the first item in array
            const latestData:any = response.data.data[0];
            dispatch(setBalancesSuccess(latestData));
        }).catch(error => {
            dispatch(setBalancesError());
        })

}

export const setAssistBox = (isOpen : boolean, index: number): ThunkAction<void, BalancesState, unknown, Action<string>> => async (dispatch: any) => {
    dispatch(showAssistBox(isOpen, index));
}