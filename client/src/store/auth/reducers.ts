import { AuthState, AUTH_SUCCESS, AuthSuccessResponse, LOG_OUT, AUTH_FAILURE, PASSWORD_RESET, SET_FETCHING, AuthActionTypes, RESET_AUTH_ERROR } from "./types";
import {updateObject} from '../../common/tools/helpers'

const initialState: AuthState = {
    token: null,
    errors: {},
    fetching: false,
};

export const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case SET_FETCHING:
            return {
                ...state,
                fetching: action.payload,
            };
        case AUTH_SUCCESS:
            let successRes: AuthSuccessResponse = action.payload;
            return {
                ...state,
                token: successRes.accessToken,
                customer_id: successRes.data.customer_id
            };

        case AUTH_FAILURE:
            return {
                ...state,
                errors: action.payload,
            };
        
        case RESET_AUTH_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    mainError : ''
                },
            };

        case LOG_OUT:
            return updateObject(
                state, {
                    token: null
                }
            );

        case PASSWORD_RESET:
            return {
                ...state,
                message: action.payload,
            };

        default:
            return state;
    }
}
