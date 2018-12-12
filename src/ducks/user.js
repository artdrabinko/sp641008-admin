import { createAction, createReducer } from "redux-act";
import { firebaseAuth } from "../firebase";

export const REDUCER = "USER";

const NS = `${REDUCER}__`;

const initialState = null;

const reducer = createReducer({}, initialState);

const gettingUser = createAction(`${NS}GETTING_USER`);
reducer.on(gettingUser, (state) => ({
  ...state,
  isLoading: true
}));

const loginSuccess = createAction(`${NS}LOGIN_SUCCESS`);
reducer.on(loginSuccess, (state, user) => ({
  ...user
}));

const gettingUserEnd = createAction(`${NS}GETTING_USER_END`);
reducer.on(gettingUserEnd, (state) => ({
  ...state,
  isLoading: false
}));

export const getUser = () => (dispatch) => {
  firebaseAuth.onAuthStateChanged((user) => {
    console.log({ user });

    dispatch(loginSuccess(user));
  });
};

export const signOut = () => (dispatch) => {
  firebaseAuth.signOut();
};

export default reducer;
