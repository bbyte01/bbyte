import React, { useState, useEffect } from "react";
import "./homepage.css";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Config } from "../../../../../Config/config";
import {
  Paper,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Box,
  InputLabel,
} from "@mui/material";
const { API_URL } = Config;

function Homepage() {
  const [totalUser, setTotalUserData] = useState({});
  const [yearData, setYearData] = useState([]);
  const [monthLabel, setMonthLabel] = useState([]);
  const [monthCount, setMonthCount] = useState([]);
  const [year, setYear] = useState("2024");
  const [statusCount, setStatusCount] = useState([]);
  const navigate = useNavigate();

  function totaluser() {
    navigate("/totaluser");
  }
  function totalvideo() {
    navigate("/totalvideo");
  }

  const getTotalUser = () => {
    let config = {
      method: "get",
      url: `${API_URL}user/count`,
      // headers: { }
    };

    axios
      .request(config)
      .then((response) => {
        setTotalUserData(response.data);
        // console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getYearData = () => {
    const requestOptions = {
      method: "GET",
      url: `${API_URL}user/new?year=${year}`,
    };
    axios(requestOptions)
      .then((data) => {
        console.log("year", data);
        const apiData = data.data.yearly;
        setMonthCount(apiData.map((i) => i.count));
        setMonthLabel(apiData.map((i) => i.month));
        setYearData(data.data.yearly);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  useEffect(() => {
    getYearData();
  }, [year]);

  useEffect(() => {
    getTotalUser();
    getYearData();
    getStatusCount();
  }, []);

  const getStatusCount = async () => {
    const api = await fetch("https://smartrisers.xyz/api/user/all")
    const json = await api.json()
    setStatusCount(json)
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item md={4}>
          <Paper>
            <div onClick={totaluser} className="paper">
              <div className="paper-heading">
                <h1>Total Users</h1>
                <h2 className="count">{totalUser.total_user_count}</h2>
              </div>
              <div className="paper-list">
                <div>
                  <p>Active</p>
                  <p className="green">{statusCount.filter(item => item.status === 'active').length}</p>
                </div>
                <div>
                  <p>Inactive</p>
                  <p className="blue">{statusCount.filter(item => item.status === 'inactive').length}</p>
                </div>
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item md={2}></Grid>
        <Grid item md={4}>
          <Paper>
            <div onClick={totalvideo} className="paper">
              <div className="paper-heading">
                <h1>Total Videos</h1>
                <h2 className="count">{totalUser.total_post_count}</h2>
              </div>
              {/* <div className="paper-list">
                <div>
                  <p>Active</p>
                  <p className="green">3,100</p>
                </div>
                <div>
                  <p>Inactive</p>
                  <p className="blue">100</p>
                </div>
                <div>
                  <p>Flag</p>
                  <p className="green">98</p>
                </div>
              </div> */}
            </div>
          </Paper>
        </Grid>
      </Grid>
      <div className="chart">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <h2>User Overview</h2>
          <FormControl size="small" sx={{ width: "100px" }}>
            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
              label="Year"
              labelId="demo-simple-select-label"
              value={year}
              onChange={handleYearChange}
            >
              <MenuItem value="2024">2024</MenuItem>
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="2022">2022</MenuItem>
              <MenuItem value="2021">2021</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <LineChart
          xAxis={[{ scaleType: "point", data: monthLabel }]}
          series={[{ data: monthCount }]}
          width={1200}
          height={400}
          margin={{ left: 70 }}
        />
      </div>
      <div className="chart">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <h2>User Overview</h2>
          <FormControl size="small" sx={{ width: "100px" }}>
            <InputLabel id="demo-simple-select-labels">Year</InputLabel>
            <Select
              label="Year"
              ladelId="demo-simple-select-labels"
              value={year}
              onchange={handleYearChange}
            >
              <MenuItem value="2024">2024</MenuItem>
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="2022">2022</MenuItem>
              <MenuItem value="2021">2021</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: ["group A", "group B", "group C", "group D"],
            },
          ]}
          series={[
            { data: monthCount },
            { data: [2, 5, 6, 5, 8, 9, 9, 8, 2, 5, 6, 5, 8, 9, 9, 8] },
            { data: monthCount },
            { data: monthCount },
          ]}
          width={1200}
          height={300}
        />
      </div>
    </div>
  );
}

export default Homepage;