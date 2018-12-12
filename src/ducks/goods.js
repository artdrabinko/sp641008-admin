import { createAction, createReducer } from "redux-act";
import { firebaseDB } from "../firebase";

export const REDUCER = "GOODS";

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

const readFailure = createAction(`${NS}READ_FAILURE`);
reducer.on(readFailure, (state, error) => ({
  ...state,
  isLoading: false
}));

export const readGoods = () => (dispatch) => {
  dispatch(readRequest());
  return firebaseDB.ref("/goods").on("value", (snap) => {
    const goods = [];

    snap.forEach((item) => {
      const {
        name,
        categoryId,
        description,
        count,
        price,
        imgURL
      } = item.val();

      const serverKey = item.key;

      goods.push({
        id: serverKey,
        name,
        categoryId,
        description,
        count,
        price,
        imgURL
      });
    });

    dispatch(readSuccess(goods));
  });
};

export default reducer;
