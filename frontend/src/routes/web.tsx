import { createBrowserRouter } from "react-router-dom";
import Login from "../views/pages/Login";
import Home from "../views/pages/Home";
import PinDetail from "../views/pages/PinDetail";
import Search from "../views/pages/Search";
import CreatePin from "../views/pages/CreatePin";
import Profile from "../views/pages/Profile";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "search",
        element: <Search/>
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  }
]);

export default routes;



