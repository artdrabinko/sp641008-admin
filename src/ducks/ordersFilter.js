import { createAction, createReducer } from "redux-act";

export const REDUCER = "ORDERS";

const NS = `${REDUCER}__`;

const initialState = {
  filter: ""
};

const reducer = createReducer({}, initialState);

const setFilter = createAction(`${NS}SET_FILTER`);
reducer.on(setFilter, (state, strFilter) => ({
  filter: strFilter
}));

const resetFilter = createAction(`${NS}RESET_FILTER`);
reducer.on(resetFilter, (state) => ({
  filter: ""
}));

export const setOrdersFilter = (strFilter) => (disbatch) => {
  disbatch(setFilter(strFilter));
};

export const resetOrdersFilter = () => (disbatch) => {
  disbatch(resetFilter());
};

export default reducer;
