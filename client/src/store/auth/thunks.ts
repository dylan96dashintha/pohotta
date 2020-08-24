import axios from "../../common/tools/axios";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action } from "redux";

import { AuthState, AuthActionTypes, AuthSuccessResponse } from './types';
import { auth, passwordReset, setFetching, logOut } from "./actions";
import handleError from "../../common/tools/apiErrorHandler";
import { fetchAccountTypes } from "../selectTypes/thunks";
import { SelectTypesState } from "../selectTypes/types";

type ThunkResult<Result> = ThunkAction<Result, AuthState, undefined, AuthActionTypes>;

export const loginAndRegisterThunk = (email: string, passw: string, register: boolean): ThunkAction<void, AuthState, unknown, Action<string>> => async (dispatch: any) => {
    let token: string;
    let LOGIN_REGISTER_PATH;
    
    if (register) {
        LOGIN_REGISTER_PATH = "/auth/signup";
    } else {
        LOGIN_REGISTER_PATH = "/auth/signin";
    }
    const loginData = { email, passw };
    
    dispatch(setFetching(true));
    axios
    .post(LOGIN_REGISTER_PATH, loginData)
    .then((response) => {
        // console.log(response);
        token = response.data.accessToken;
        // Store token and expiration to localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("iat", response.data.iat);
        localStorage.setItem("exp", response.data.exp);
        setAxiosHeader(token);
        dispatch(setFetching(false));
        dispatch(getInitialData(response.data));
    })
    .catch((error) => {
        dispatch(setFetching(false));
        const handledError = handleError(error.response ? error.response.data : {});
        dispatch(auth(false, handledError));
    });
};

export const resetPasswordThunk = (email: string): ThunkAction<void, AuthState, unknown, Action<string>> => async (dispatch: any) => {
    const PW_RESET_PATH = "/auth/signin-forgotten";
    const pwResetData = { email };

    dispatch(setFetching(true));
    axios
        .post(PW_RESET_PATH, pwResetData)
        .then((response) => {
            dispatch(setFetching(false));
            dispatch(passwordReset(response.data.message));
        })
        .catch((error) => {
            dispatch(setFetching(false));
            dispatch(passwordReset(handleError(error.response ? error.response.data : {})));
        });
};

export const checkAuthStatusThunk = (): ThunkAction<void, AuthState, unknown, Action<string>> => async (dispatch: any) => {
    const token: string | null = localStorage.getItem("token") ? localStorage.getItem("token") : null;
    const iat: string | null = localStorage.getItem("iat") ? localStorage.getItem("iat") : null;
    const expStr: string | null = localStorage.getItem("exp") ? localStorage.getItem("exp") : null;
    const exp:number = expStr ? parseInt(expStr) : 0;
    const now:number =  Math.floor(new Date().getTime()/1000);

    // Check that there's a token and it's not expired
    if (token && exp && exp > now) {
        dispatch(setFetching(true));
        setAxiosHeader(token);
        axios.get("/auth/member", { headers: { Authorization: "Bearer " + token } })
        .then((response) => {
            // console.log(response);
            const data:AuthSuccessResponse = {
                accessToken: token,
                ...response.data,
                exp: exp,
                iat: iat,
            };
            dispatch(getInitialData(data));
        })
        .catch((error) => {
            dispatch(setFetching(false));
            const handledError = handleError(error.response ? error.response.data : {});
            dispatch(auth(false, handledError));
        });
    } else {
        console.log("no token");
        dispatch(logOut()); 
    }
};

export const getInitialData = (data: AuthSuccessResponse): ThunkResult<Promise<any>> => {
    return async (dispatch: ThunkDispatch<SelectTypesState, undefined, Action<string>>) => {
        dispatch(fetchAccountTypes())
        .then( () => {
            dispatch(setFetching(false));
            dispatch(auth(true, data));
        });
    };
};

export const cleanUpAndLogOut = (): ThunkAction<void, AuthState, unknown, Action<string>> => async (dispatch: any) => {
    //Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("iat");
    localStorage.removeItem("exp");
    dispatch(logOut());
};

const setAxiosHeader = (token:string) => {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token; //set token for axios use
};
