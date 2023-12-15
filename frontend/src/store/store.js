import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import rootReducer from "../redux/reducer/reducer";
import thunk from "redux-thunk";


const allReducer = combineReducers({
    rootReducer
})

export const store = legacy_createStore(allReducer,applyMiddleware(thunk))