import { createAction, createReducer } from "redux-act";

export const REDUCER = "BACK_BUTTON";

const NS = `${REDUCER}__`;

const initialState = {
  isVisible: false,
  backLink: "/"
};

const reducer = createReducer({}, initialState);

const showButton = createAction(`${NS}SHOW`);
reducer.on(showButton, (state, url) => ({
  isVisible: true,
  backLink: url
}));

const hideButton = createAction(`${NS}HIDE`);
reducer.on(hideButton, (state) => ({
  isVisible: false,
  backLink: "/"
}));

export const setBackButtonUrl = (url) => (dispatch) => {
  dispatch(showButton(url));
};

export const hideBackButton = () => (dispatch) => {
  dispatch(hideButton());
};

export default reducer;
