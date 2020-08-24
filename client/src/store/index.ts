import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from 'redux-logger';


import { authReducer } from "../store/auth/reducers";
import { accountReducer, deleteBoxReducer } from "../store/account/reducers";
import { selectTypesReducer } from "../store/selectTypes/reducers"
import { balancesReducer } from "../store/balances/reducers"
import { requestReducer } from "../store/request/reducers"

// const composeEnhancers = true ? (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) : null || compose;
const composeEnhancers = compose

const rootReducer = combineReducers({
    auth: authReducer,
    account: accountReducer,
    balances: balancesReducer,
   
    selectTypes: selectTypesReducer,
    request: requestReducer,
    deleteBox: deleteBoxReducer
})

export type RootState = ReturnType<typeof rootReducer>;

export default function configureStore() {

    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk, logger))
    );

    return store;
}
