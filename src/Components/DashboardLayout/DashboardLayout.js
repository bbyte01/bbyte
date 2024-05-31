import React from "react";
import Navbar from "../Homepage/Dashboard/Navbar/Navbar";
import Sidebar from "../Homepage/Dashboard/Sidebar/Sidebar";
import { Box } from "@mui/material";
import DashboardRoutes from "./DashboardRoutes";

function DashboardLayout() {
  return (
    <Box display="flex">
      <Sidebar />
      <Box
        sx={{
          width: "calc(100% - 265px)",
          backgroundColor: "#E7EBFF",
        }}
      >
        <Navbar />
        <DashboardRoutes />
      </Box>
    </Box>
  );
}

export default DashboardLayout;
