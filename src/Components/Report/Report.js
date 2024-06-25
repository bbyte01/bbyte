import { useState, useEffect } from "react";
import axios from "axios";
import { Config } from "../../Config/config";
import ReportDialog from "./ReportDescription";
import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  FormControl,
  IconButton,
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
import { IconFileDescription } from "@tabler/icons-react";
import moment from "moment";

const { API_URL } = Config;
function createData(id, name, email, status) {
  return { id, name, email, status };
}

function Report() {
  const [report, setReportList] = useState([]);
  const [open, setOpen] = useState(false);
  const [reportData, setReportData] = useState({});

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (index) => {
    setOpen(true);
    setReportData(report[index]);
  };
  const getReport = () => {
    let config = {
      method: "get",
      // maxBodyLength: Infinity,
      url: `${API_URL}report/all`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response) => {
        setReportList(response.data);
        // console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getReport();
  }, []);
  return (
    <Paper
      sx={{
        width: "100%",
        padding: "20px",
      }}
    >
      <h2> Report</h2>
      <div>
        <FormControl sx={{ minWidth: 200}} size="small">
          <InputLabel id="demo-select-small-label">Filter</InputLabel>
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
                <TableCell align="left" sx={{ fontWeight: "700" }}>
                User Id
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "700" }}>
                  Reporter
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "700" }}>
                  Reported
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "700" }}>
                  Description
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "700" }}>
                  Date/Time
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "700" }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {report.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  {/* <TableCell align="left">{index + 1}</TableCell> */}
                  <TableCell align="left" sx={{ textTransform: "capitalize" }}>
                    {row?.reporter?.name}
                  </TableCell>
                  <TableCell align="left" sx={{ textTransform: "capitalize" }}>
                    {row?.reported?.name}
                  </TableCell>
                  <TableCell align="left">
                    <IconButton onClick={() => handleOpen(index)}>
                      <IconFileDescription />
                    </IconButton>
                  </TableCell>
                  <TableCell align="left">
                    {moment(row.created_at).format("DD MMM YYYY HH:MM A")}
                  </TableCell>
                  <TableCell align="left">
                    <Chip
                      size="small"
                      color={row.status === "inactive" ? "error" : "success"}
                      label={row.status ? row?.status : "Completed"}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ReportDialog
          open={open}
          handleClose={handleClose}
          reportData={reportData}
        />
      </div>
    </Paper>
  );
}

export default Report;
