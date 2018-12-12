import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import goods from "./goods";
import basket from "./basket";
import categories from "./categories";
import backButton from "./backButton";
import categoryFilter from "./categoryFilter";
import goodsFilter from "./goodsFilter";
import ordersFilter from "./ordersFilter";
import dashboard from "./dashboard";
import user from "./user";
import orders from "./orders";

const rootReducer = function(history) {
  return combineReducers({
    router: connectRouter(history),
    user,
    goods,
    orders,
    basket,
    categories,
    backButton,
    categoryFilter,
    goodsFilter,
    ordersFilter,
    dashboard
  });
};

export default rootReducer;
