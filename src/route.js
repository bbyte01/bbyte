import * as React from "react";
import Login from "./Components/Auth/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./Components/PrivateRoute";
import DashboardLayout from "./Components/DashboardLayout/DashboardLayout";

const Approute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          {/* <Route path="*" element={
              <DashboardLayout />
          } /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Approute;
