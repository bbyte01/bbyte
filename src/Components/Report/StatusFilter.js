import {
  Box,
  Collapse,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { IconFilter } from "@tabler/icons-react";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

function StatusFilter({ status, setStatus }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (e) => {
    setStatus(e);
    handleClose();
  };
  return (
    <Box>
      <IconButton
        sx={{
          padding: "5px",
          position: "absolute",
          right: "20px",
          top: "15px",
        }}
        onClick={handleClick}
      >
        <IconFilter />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        value={status}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem value="completed" onClick={() => handleChange("completed")}>
          Completed
        </MenuItem>
        <MenuItem value="pending" onClick={() => handleChange("pending")}>
          Pending
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default StatusFilter;
