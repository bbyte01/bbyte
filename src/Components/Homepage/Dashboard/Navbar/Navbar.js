import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Logo from "../../../../images/logo.png";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { AppBar, Autocomplete, Box, CircularProgress, Drawer, FormControlLabel, FormGroup, Hidden, IconButton, Menu, MenuItem, Switch, TextField, Toolbar, Typography } from "@mui/material";
import { Config } from "../../../../Config/config";
import axios from "axios";
import { IconMenu2, IconUserCircle } from "@tabler/icons-react";
import Sidebar from "../Sidebar/Sidebar";

const { API_URL } = Config;

function Navbar() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchOption, setSearchOptions] = useState([]);
  const [auth, setAuth] = useState(true)
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSelectSearch = (e, val) => {
    navigate(`/uservideo/${val.username}`);
  };

  const handleSearch = () => {
    setLoading(true);
    setSearchOptions([]);
    const requestOptions = {
      method: "GET",
      url: `${API_URL}search?query=${searchValue}`,
    };
    axios(requestOptions)
      .then((data) => {
        setLoading(false);
        setSearchOptions(data.data);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  return (
    <>
      {/* <div className="navbar">
          
        <Box />
        <div className="search-container">
          <Autocomplete
            id="asynchronous-demo"
            value={null}
            onChange={handleSelectSearch}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            options={searchOption}
            loading={loading}
            sx={{
              width: "300px",
            }}
            onInputChange={handleSearchChange}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                label="Search user"
                sx={{
                  background: "#fff",
                }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        </div>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" className="dropdown-toggle">
            <div className="bg-user"></div>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div> */}
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor : '#1f243c', boxShadow : 'none'}}>
        <Toolbar>
          <Hidden mdUp>
            <IconButton onClick={()=> setOpen(!open)}>
              <IconMenu2 color="#fff" />
            </IconButton>
          </Hidden>
          <Box sx={{flexGrow : 1}}></Box>
          <Box className="search-container" sx={{flexGrow : 1}}>
          <Autocomplete
            id="asynchronous-demo"
            value={null}
            onChange={handleSelectSearch}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            options={searchOption}
            loading={loading}
            sx={{
              width: "300px",
            }}
            onInputChange={handleSearchChange}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                label="Search user"
                sx={{
                  background: "#fff",
                }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        </Box>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <IconUserCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
    <Drawer open={open} onClose={()=> setOpen(!open)}>
        <Sidebar 
          handleOpen={()=> setOpen(!open)}
        />
    </Drawer>
    </>
  );
}

export default Navbar;
