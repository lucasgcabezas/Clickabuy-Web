import { combineReducers } from "redux";
import categoryReducer from './categoryReducer'
import authReducer from "./authReducer";
import productReducer from "./productReducer";

const rootReducer = combineReducers({  categoryReducer, authReducer, productReducer})

export default rootReducer