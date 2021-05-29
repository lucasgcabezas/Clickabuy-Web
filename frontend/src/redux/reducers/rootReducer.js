import { combineReducers } from "redux";
import categoryReducer from './categoryReducer'
import authReducer from "./authReducer";
import cartReducer from "./cartReducer"
const rootReducer = combineReducers({  categoryReducer, authReducer,cartReducer })

export default rootReducer