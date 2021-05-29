import { combineReducers } from "redux";
import categoryReducer from './categoryReducer'
import authReducer from "./authReducer";
import cartReducer from "./cartReducer"
import productReducer from "./productReducer";

const rootReducer = combineReducers({  categoryReducer, authReducer, productReducer, cartReducer})

export default rootReducer