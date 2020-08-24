import { AuthActionTypes, AUTH_SUCCESS, AUTH_FAILURE, SET_FETCHING, LOG_OUT, PASSWORD_RESET, RESET_AUTH_ERROR } from "./types";

export const auth = (success: boolean, data: any): AuthActionTypes => {
    if (success) {
        return {
            type: AUTH_SUCCESS,
            payload: data,
        };
    } else {
        return {
            type: AUTH_FAILURE,
            payload: data,
        };
    }
}

export const resetAuthError = () => {
    return {
        type : RESET_AUTH_ERROR
    }
}

export const logOut = () => {
    return {
        type: LOG_OUT,
    };
}

export const setFetching = (value: boolean) => {
    return {
        type: SET_FETCHING,
        payload: value,
    };
}

export const passwordReset = (message: string): AuthActionTypes => {
    return {
        type: PASSWORD_RESET,
        payload: message,
    };
}
