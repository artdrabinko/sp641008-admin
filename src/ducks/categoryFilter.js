import { createAction, createReducer } from "redux-act";

export const REDUCER = "CATEGORY";

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

export const setCategoryFilter = (strFilter) => (disbatch) => {
  disbatch(setFilter(strFilter));
};

export const resetCategoryFilter = () => (disbatch) => {
  disbatch(resetFilter());
};

export default reducer;
