import { createAction, createReducer } from "redux-act";
import { firebaseDB } from "../firebase";

export const REDUCER = "ORDERS";

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

export const readOrders = () => (dispatch) => {
  dispatch(readRequest());
  return firebaseDB.ref("/orders").on("value", (snap) => {
    const orders = [];

    snap.forEach((item) => {
      const {
        address,
        country,
        email,
        firstName,
        lastName,
        phone,
        products
      } = item.val();

      const serverKey = item.key;

      orders.push({
        id: serverKey,
        address,
        country,
        email,
        firstName,
        lastName,
        phone,
        products
      });
    });

    console.log({ orders });

    dispatch(readSuccess(orders));
  });
};

export default reducer;
