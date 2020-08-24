import { SET_REQUEST_ERROR, START_REQUEST, SET_REQUEST_SUCCESS, CLEAR_REQUEST, RequestKey, RequestActionTypes } from "./types"
import { ErrorObject } from "../../common/tools/apiErrorHandler"
export function setRequestError(key: RequestKey, errors: ErrorObject): RequestActionTypes {
    return {
        type: SET_REQUEST_ERROR,
        payload: { key, errors }
    }
}
export function setRequestSuccess(key: RequestKey, data?: any): RequestActionTypes {
    return {
        type: SET_REQUEST_SUCCESS,
        payload: { key, data }
    }
}
export function startRequest(key: RequestKey): RequestActionTypes {
    return {
        type: START_REQUEST,
        payload: key
    }
}
export function clearRequest(key: RequestKey): RequestActionTypes {
    return {
        type: CLEAR_REQUEST,
        payload: key
    }
}