import { combineReducers } from "redux";
import categoryReducer from './categoryReducer'
import authReducer from "./authReducer";

const rootReducer = combineReducers({  categoryReducer, authReducer })

export default rootReducer