import App from "./App";
import { Dashboard, SignIn, NoMatch } from "./pages/";

export const links = {
  SIGN_IN: "/signin",
  DASHBOARD: "/",
  ORDERS: "/orders",
  CREATE_ORDER: "/orders/new/",
  UPDATE_ORDER: "/orders/:id/",
  GOODS: "/goods",
  CREATE_GOODS: "/goods/new",
  UPDATE_GOODS: "/goods/:id",
  CATEGORIES: "/categories",
  CREATE_CATEGORY: "/categories/new",
  UPDATE_CATEGORY: "/categories/:id"
};

const routes = [
  {
    component: App,
    routes: [
      {
        path: links.DASHBOARD,
        exact: true,
        component: Dashboard
      },
      {
        path: links.SIGN_IN,
        exact: true,
        component: SignIn
      },
      {
        component: NoMatch
      }
    ]
  }
];

export default routes;
