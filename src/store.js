import { createBrowserHistory } from "history";
import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import createRootReducer from "./ducks";

export const history = createBrowserHistory();

let store;
const configureStore = function() {
  const middlewares = [routerMiddleware(history), thunk];
  const enchancers = applyMiddleware(...middlewares);
  store = createStore(createRootReducer(history), compose(enchancers));
  return store;
};

export const dispatch = function(action) {
  return store.dispatch(action);
};

export default configureStore;
