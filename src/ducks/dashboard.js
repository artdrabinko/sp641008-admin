import { createAction, createReducer } from "redux-act";

export const REDUCER = "DASHBOARD";

const NS = `${REDUCER}__`;

const initialState = {
  filter: ""
};

const reducer = createReducer({}, initialState);

const setTitle = createAction(`${NS}SET_TITLE`);
reducer.on(setTitle, (state, title) => ({
  title
}));

const resetTitle = createAction(`${NS}RESET_TITLE`);
reducer.on(resetTitle, (state) => ({
  title: ""
}));

export const setDashboardTitle = (title) => (disbatch) => {
  disbatch(setTitle(title));
};

export const resetDashboardTitle = () => (disbatch) => {
  disbatch(resetTitle());
};

export default reducer;
