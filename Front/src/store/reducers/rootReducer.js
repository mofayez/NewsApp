import authReducer from './authReducer';
import newsReducer from './newsReducer';
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    auth: authReducer,
    news: newsReducer
});

export default rootReducer