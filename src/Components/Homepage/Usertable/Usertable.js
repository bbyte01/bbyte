import React, { useState } from "react";
import "./usertable.css";
import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function createData(id, name, email, status) {
  return { id, name, email, status };
}

const rows = [
  createData(1, "User123", "test1@gmail.com", "Active"),
  createData(2, "User124", "test2@gmail.com", "Inactive"),
  createData(3, "User125", "test3@gmail.com", "Active"),
  createData(4, "User126", "test4@gmail.com", "Active"),
  createData(5, "User127", "test5@gmail.com", "Active"),
];

function Usertable({userData}) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);

  const handleChange = (e, id) => {
    if (e.target.checked) {
      const list = selected;
      list.push(id);
      setSelected([...list]);
    } else {
      const list = selected;
      const filter = list.filter((i) => i !== id);
      setSelected([...filter]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const newSelected = rows.map((i) => i.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  function nav() {
    navigate("/uservideo");
  }
  return (
    <Paper
      sx={{
        width: "100%",
        padding: "20px",
      }}
    >
      <h2>Total user table</h2>
      <div>
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">User</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            // value={age}
            label="Age"
            // onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>New joined user</MenuItem>
            <MenuItem value={20}>one month </MenuItem>
            <MenuItem value={30}>one year</MenuItem>
          </Select>
        </FormControl>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    checked={selected.length === rows.length}
                    indeterminate={
                      selected.length > 0 && selected.length < rows.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "700" }}>
                  S. No.
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "700" }}>
                  Name
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "700" }}>
                  Gender
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "700" }}>
                  Username
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "700" }}>
                  Email
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "700" }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.map((row, index) => (
                <TableRow
                  key={row.username}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Checkbox
                      checked={selected.includes(row.user_id)}
                      onChange={(e) => handleChange(e, row.user_id)}
                    />
                  </TableCell>
                  <TableCell align="left">{index + 1}</TableCell>
                  <TableCell align="left" sx={{textTransform: 'capitalize'}}>{row.name}</TableCell>
                  <TableCell align="left" sx={{textTransform: 'capitalize'}}>{row.gender}</TableCell>
                  <TableCell align="left">
                    <Box display="flex" alignItems="center" justifyContent="flex-start">
                      <Avatar 
                        sx={{
                          marginRight : '10px'
                        }}
                      />
                      <Link to={`/uservideo/${row.username}`}>
                        {row.username}
                      </Link>
                    </Box>
                  </TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">
                    <Chip 
                      size="small"
                      color={row.status === "inactive" ? "error" : "success"}
                      label={row.status ? row?.status : 'active'}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Paper>
  );
}

export default Usertable;
