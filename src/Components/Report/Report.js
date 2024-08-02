import { useState, useEffect } from "react";
import axios from "axios";
import { Config } from "../../Config/config";
import ReportDialog from "./ReportDescription";
import Filter from "./Filter";
import StatusFilter from "./StatusFilter";
import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  IconButton,
  Paper,
  Skeleton,
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
import dayjs from "dayjs";

const { API_URL } = Config;

function Report() {
  const todayDate = dayjs();
  const prevDate = todayDate.subtract(30, "day");
  const [report, setReportList] = useState([]);
  const [open, setOpen] = useState(false);
  const [reportData, setReportData] = useState({});
  const [startDate, setStartDate] = useState(prevDate);
  const [endDate, setEndDate] = useState(todayDate);
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (index) => {
    setOpen(true);
    setReportData(report[index]);
  };
  const getReport = () => {
    setLoading(true);
    let config = {
      method: "get",
      // maxBodyLength: Infinity,
      url: `${API_URL}report/all?start_date=${startDate.format(
        "YYYY-MM-DD"
      )}&status=${status}&end_date=${endDate.format("YYYY-MM-DD")}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response) => {
        setLoading(false);
        setReportList(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleChange = (date) => {
    console.log(date);
  };
  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  useEffect(() => {
    getReport();
  }, [status]);

  useEffect(() => {
    getReport();
  }, []);
  return (
    <Paper
      sx={{
        width: "100%",
        padding: "20px",
        position: "relative",
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <h2> Report</h2>
        <Filter
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          getReport={getReport}
        />
      </Box>
      <StatusFilter status={status} setStatus={setStatus} />
      <div>
        {loading ? (
          <Box>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={`skeleton-${i}`} variant="text" height={100} />
            ))}
          </Box>
        ) : (
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
                    <TableCell
                      align="left"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {row?.reporter?.name}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ textTransform: "capitalize" }}
                    >
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
        )}
        <ReportDialog
          getReport={getReport}
          open={open}
          handleClose={handleClose}
          reportData={reportData}
        />
      </div>
    </Paper>
  );
}

export default Report;
