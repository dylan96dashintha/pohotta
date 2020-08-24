export interface AuthState {
    token: string | null;
    userId?: string;
    customer_id? :number;
    errors: {
        mainError?: string;
        inputErrors?: {};
    };
    fetching: boolean;
    message?: string;
}

interface AuthSuccessAction {
    type: typeof AUTH_SUCCESS;
    payload: AuthSuccessResponse;
}

interface AuthFailureAction {
    type: typeof AUTH_FAILURE;
    payload: any;
}

interface ResetAuthErrorAction {
    type: typeof RESET_AUTH_ERROR;
    payload: any;
}

interface AuthResetPasswordAction {
    type: typeof PASSWORD_RESET;
    payload: string;
}
interface SetFetchingAction {
    type: typeof SET_FETCHING;
    payload: boolean;
}
interface LogOutAction {
    type: typeof LOG_OUT;
}

export interface AuthSuccessResponse { //this is for both login and register
    message: string;
    statusCode: number;
    data: {
        member_id: number;
        customer_id: number;
    };
    accessToken: string;
    iat: number;
    exp: number;
}



export type AuthActionTypes = AuthSuccessAction | AuthFailureAction  | ResetAuthErrorAction | AuthResetPasswordAction | SetFetchingAction | LogOutAction

export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAILURE = 'AUTH_FAILURE'
export const RESET_AUTH_ERROR = 'RESET_AUTH_ERROR'
export const LOG_OUT = 'LOG_OUT'
export const PASSWORD_RESET = 'PASSWORD_RESET'
export const SET_FETCHING = 'SET_FETCHING'