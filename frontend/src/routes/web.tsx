import { createBrowserRouter } from "react-router-dom";
import Login from "../views/pages/Login";
import Home from "../views/pages/Home";
import PinDetail from "../views/pages/PinDetail";
import Search from "../views/pages/Search";
import CreatePin from "../views/pages/CreatePin";
import Profile from "../views/pages/Profile";
import Feeds from "../views/pages/Feeds";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index : true,
        element: <Feeds/>
      },
      {
        path: "search",
        element: <Search/>
      },
      {
        path : "category/:category",
        element : <Feeds/>
      },
      {
        path: "create-pin",
        element : <CreatePin/>
      },
      {
        path: "user-profile/:id",
        element : <Profile/>
      },  
      {
        path: "pin/:id",
        element : <PinDetail/>
      },
    ]
  },
  {
    path: "/login",
    element: <Login />
  }
]);

export default routes;



