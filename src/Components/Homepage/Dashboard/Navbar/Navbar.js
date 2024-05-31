import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Logo from "../../../../images/logo.png";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { Autocomplete, Box, CircularProgress, TextField } from "@mui/material";
import { Config } from "../../../../Config/config";
import axios from "axios";

const { API_URL } = Config;

function Navbar() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchOption, setSearchOptions] = useState([]);

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
    <div className="navbar">
      {/* <img onClick={login} src={Logo} height={60} /> */}
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
        {/* <input type="text" id="search-input" placeholder="Search..." /> */}
        {/* <button type="button" id="search-button">
            Search
          </button> */}
      </div>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic" className="dropdown-toggle">
          <div className="bg-user"></div>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default Navbar;
