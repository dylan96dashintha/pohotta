import axios from "../../common/tools/axios";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { RequestState, RequestKey } from "./types"
import { startRequest, setRequestError, setRequestSuccess } from "./actions"
import handleError from "../../common/tools/apiErrorHandler"

enum Method {
    post = 'post',
    delete = 'delete',
    get = 'get',
    patch = 'patch'
}

export interface Endpoint {
    url: string,
    method: Method,
    key: RequestKey,
    urlParams?: string,
    passDataToRedux?: boolean
}



export const POST_ACCOUNT_ENDPOINT: Endpoint = { url: '/accounts', method: Method.post, key: RequestKey.postAccount }
export const PATCH_ACCOUNT_ENDPOINT: Endpoint = { url: '/accounts', method: Method.patch, key: RequestKey.patchAccount }
export const DELETE_ACCOUNT_ENDPOINT: Endpoint = { url: '/accounts', method: Method.delete, key: RequestKey.deleteAccount }
export const POST_TRANSACTION_ENDPOINT: Endpoint = { url: '/transactions', method: Method.post, key: RequestKey.deleteAccount }
export const PATCH_TRANSACTION_ENDPOINT: Endpoint = { url: '/transactions', method: Method.patch, key: RequestKey.patchTransaction}
export const DELETE_TRANSACTION_ENDPOINT: Endpoint = { url: '/transactions', method: Method.delete, key: RequestKey.deleteTransaction }
export const GET_ACCOUNT_ENDPOINT: Endpoint = { url: '/accounts', method: Method.get, key: RequestKey.getAccount, passDataToRedux: true }


function getEndpointUrl(endpoint: Endpoint) {
    if (endpoint.urlParams !== undefined) {
        return `${endpoint.url}${endpoint.urlParams}`
    } else {
        return endpoint.url
    }
}

export const executeRequest = (endpoint: Endpoint, data?: any): ThunkAction<void, RequestState, unknown, Action<string>> => async (dispatch: any) => {

    dispatch(startRequest(endpoint.key));

    axios.request({
        url: getEndpointUrl(endpoint),
        method: endpoint.method,
        data: data
    }).then(response => {
            // console.log(response);
        if (endpoint.passDataToRedux) {
            dispatch(setRequestSuccess(endpoint.key, response.data))
        } else {
            dispatch(setRequestSuccess(endpoint.key))

        }
        }).catch(error => {
            const handledError = handleError(error.response.data);

            if (handledError.hasOwnProperty('mainError')) {
                alert(handledError.mainError)
            }

            // console.log(handledError);
            dispatch(setRequestError(endpoint.key, handledError))
        })

}