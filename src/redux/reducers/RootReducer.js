import { combineReducers } from "redux";
import CommonReducer from "../../modules/_redux/CommonReducer";

// combine all of the reducers here
const rootReducer = combineReducers({
  homeInfo: CommonReducer
});

export default rootReducer;
