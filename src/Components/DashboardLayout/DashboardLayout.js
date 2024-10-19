import React from "react";
import Navbar from "../Homepage/Dashboard/Navbar/Navbar";
import Sidebar from "../Homepage/Dashboard/Sidebar/Sidebar";
import { Box, Hidden, useMediaQuery, useTheme } from "@mui/material";
import DashboardRoutes from "./DashboardRoutes";

function DashboardLayout() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Box display="flex">
      <Hidden mdDown>
      <Sidebar handleOpen={()=> {}} />
      </Hidden>
      <Box
        sx={{
          width: isLargeScreen ? "calc(100% - 265px)" : "100%",
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
