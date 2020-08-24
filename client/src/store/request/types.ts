import { ErrorObject } from "../../common/tools/apiErrorHandler"

export interface Request {
    error: boolean,
    success: boolean,
    loading: boolean,
    errors: {
        mainError?: string;
        inputErrors?: {};
    };
    data?: any;
}

export interface RequestState {
    requests: { [key: string]: Request }
}

export enum RequestKey {
    postAccount = 'postAccount',
    getAccount = 'getAccount',
    patchAccount = 'patchAccount',
    deleteAccount = 'deleteAccount',
    deleteTransaction = 'deleteTransaction',
    patchTransaction = 'patchTransaction',
}

interface StartRequestAction {
    type: typeof START_REQUEST
    payload: RequestKey
}
interface SetRequestErrorAction {
    type: typeof SET_REQUEST_ERROR
    payload: {
        key: RequestKey,
        errors: ErrorObject
    }
}
interface SetRequestSuccessAction {
    type: typeof SET_REQUEST_SUCCESS
    payload: {
        key: RequestKey,
        data?: any
    }
}

interface ClearRequestAction {
    type: typeof CLEAR_REQUEST
    payload: RequestKey
}


export type RequestActionTypes = StartRequestAction | SetRequestErrorAction | SetRequestSuccessAction | ClearRequestAction


export const SET_REQUEST_ERROR = 'SET_REQUEST_ERROR'
export const START_REQUEST = 'START_REQUEST'
export const SET_REQUEST_SUCCESS = 'SET_REQUEST_SUCCESS'
export const CLEAR_REQUEST = 'CLEAR_REQUEST'