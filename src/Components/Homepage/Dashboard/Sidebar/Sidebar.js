import React from "react";
import "./Sidebar.css";
import Logo from "../../../../images/uplogo.png";
import { IconHome, IconUser, IconUserCircle } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

function Sidebar() {
  const navigate = useNavigate();

  function login() {
    navigate("/dashboard");
  }
  function totalusers() {
    navigate("/totaluser");
  }
  return (
    <div className="Sidebar">
      <Box p="20px" pb="0px">
        <img src={Logo} height={100} />
      </Box>

      <div className="sidebarmenu">
        <ul className="sidebar-ul">
          <li onClick={login} className="sidebar-li">
            <Box className="icon-bg">
              <IconHome className="icon" />
            </Box>
            <Typography className="li-text">Dashboard</Typography>
          </li>
          <li onClick={totalusers} className="sidebar-li">
            <Box className="icon-bg">
              <IconUser className="icon" />
            </Box>
            <Typography className="li-text">User</Typography>
          </li>
          <li className="sidebar-li">
            <Box className="icon-bg">
              {/* <IconUser 
                className="icon"
              /> */}
            </Box>
            <Typography className="li-text">Billings</Typography>
          </li>

          <li className="sidebar-li">
            <b>Account Type</b>
          </li>
          <li onClick={login} className="sidebar-li">
            <Box className="icon-bg">
              <IconUserCircle className="icon" />
            </Box>
            <Typography className="li-text">Profile</Typography>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Sidebar;
