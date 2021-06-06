import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { loadState, saveState } from "../data";
import rootReducer from "../reducers";

const initialState = loadState();
const store = createStore(rootReducer, initialState, applyMiddleware(logger));

store.subscribe(() => saveState(store.getState()));

export default store;
