import * as React from "react";
import Login from "./Components/Auth/Login";
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import Homepage from "./Components/Homepage/Dashboard/Dashboard";
import Totaluser from "./Components/Totaluser/Totaluser";
import Usertable from "./Components/Homepage/Usertable/Usertable";
import Totaluservideo from "./Components/Uservideo/Totaluservideo";
import Totalvideo from "./Components/Totalvideo/Totalvideo";
import { PrivateRoute } from "./Components/PrivateRoute";
import DashboardLayout from "./Components/DashboardLayout/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  // {
  //   path: "/dashboardon",
  //   element: <Homepage />,
  // },
  // {
  //   path: "/totaluser",
  //   element: <Totaluser />,
  // },
  // {
  //   path: "/usertable",
  //   element: <Usertable />,
  // },
  // {
  //   path: "/uservideo",
  //   element: <Totaluservideo />,
  // },
  // {
  //   path:"/totalvideo",
  //   element:<Totalvideo/>,
  // },
  {
    path: "/:page_type",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
  },
]);

const Approute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/*" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
          {/* <Route path="*" element={
              <DashboardLayout />
          } /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

export default Approute;
