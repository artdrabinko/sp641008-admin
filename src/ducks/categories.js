import { createAction, createReducer } from "redux-act";
import { firebaseDB } from "../firebase";

export const REDUCER = "CATEGORIES";

const NS = `${REDUCER}__`;

const initialState = {
  items: [],
  isLoading: false
};

const reducer = createReducer({}, initialState);

const readRequest = createAction(`${NS}READ_REQUEST`);
reducer.on(readRequest, (state) => ({
  ...state,
  isLoading: true
}));

const readSuccess = createAction(`${NS}READ_SUCCESS`);
reducer.on(readSuccess, (state, items) => ({
  ...state,
  items: [...items],
  isLoading: false
}));

export const readCategories = () => (dispatch) => {
  dispatch(readRequest());
  return firebaseDB.ref("/categories").on("value", (snap) => {
    console.log({ snap });

    const categories = [];

    snap.forEach((post) => {
      const { categoryName } = post.val();
      const serverKey = post.key;

      categories.push({ id: serverKey, categoryName });
    });

    dispatch(readSuccess(categories));
  });
};

export default reducer;
