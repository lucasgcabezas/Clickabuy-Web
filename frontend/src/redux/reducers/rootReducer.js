<<<<<<< HEAD
import { combineReducers } from "redux";
import categoryReducer from './categoryReducer'
import authReducer from "./authReducer";

const rootReducer = combineReducers({  categoryReducer, authReducer })
=======
import { combineReducers } from "redux"
import storeReducer from './storeReducer'
const rootReducer = combineReducers({ storeReducer })
>>>>>>> 64ac667625c0168297bf75a4f6eb5e31d7cee72d

export default rootReducer