import {combineReducers} from "redux";
import userReducers from "./reducer";

const rootReducer=combineReducers({
    user:userReducers
})

export default rootReducer;
