import Index from "views/admin/dashboard";
import Login from "views/login/login.js";
import ForgotPass from 'views/login/forgotPass';
import NvaPass from 'views/login/newPass'
var routes = [
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: process.env.PUBLIC_URL + "/auth"
  },
  {
    path: "/new-pass",
    name: "New Pass",
    icon: "ni ni-circle-08 text-pink",
    component: NvaPass,
    layout: process.env.PUBLIC_URL + "/auth"
  },
  {
    path: "/forgot-pass",
    name: "Forgot Pass",
    icon: "ni ni-circle-08 text-pink",
    component: ForgotPass,
    layout: process.env.PUBLIC_URL + "/auth"
  },
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: process.env.PUBLIC_URL + "/admin"
  }
];
export default routes;
