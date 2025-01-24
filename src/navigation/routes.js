import { Login } from "../auth/Login";
import { Home } from "../pages/Home";
import { Products } from "../pages/Products";

export const routes = [
  {
    to: "/home",
    path: "home",
    Component: Home,
    name: "Home",
  },
  {
    to: "/products",
    path: "products",
    Component: Products,
    name: "Products",
  },
  {
    to: "/login",
    path: "login",
    Component: Login,
    name: "Login",
  },
];
