import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import budgetReducer from "./budget/budgetReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  budget: budgetReducer,
});

export default rootReducer;
