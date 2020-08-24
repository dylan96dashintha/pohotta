import { RequestState, START_REQUEST, SET_REQUEST_SUCCESS, SET_REQUEST_ERROR, CLEAR_REQUEST } from "./types";

const initialState: RequestState = {
    requests: {},
};

export function requestReducer(state = initialState, action: any): RequestState {
    switch (action.type) {
        default:
            return state;
        case START_REQUEST:
            return { ...state, requests: { ...state.requests, [action.payload]: { error: false, success: false, loading: true, errors: {} } } };
        case SET_REQUEST_ERROR:
            return {
                ...state,
                requests: { ...state.requests, [action.payload.key]: { error: true, success: false, loading: false, errors: action.payload.errors } },
            };
        case SET_REQUEST_SUCCESS:
            if (action.payload.data) {
                return {
                    ...state,
                    requests: {
                        ...state.requests,
                        [action.payload.key]: { error: false, success: true, loading: false, errors: {}, data: action.payload.data.data[0] },
                    },
                };
            } else {
                return { ...state, requests: { ...state.requests, [action.payload.key]: { error: false, success: true, loading: false, errors: {} } } };
            }
        case CLEAR_REQUEST:
            return { ...initialState };
    }
}
