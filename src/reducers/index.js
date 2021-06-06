import { combineReducers } from "redux";
import { trello } from "./trello";

const rootReducer = combineReducers({
  trello,
});
export default rootReducer;
