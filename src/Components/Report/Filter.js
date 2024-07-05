import React, { useState } from "react";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Popper,
  Paper,
  Collapse,
  Typography,
  IconButton,
  Button,
  IconFilter,
} from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { IconCircleArrowUpFilled } from "@tabler/icons-react";

function Filter({ startDate, setStartDate, endDate, setEndDate, getReport }) {
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    setOpen(false);
    getReport();
  };

  return (
    <Box>
      <Paper
        sx={{
          width: "250px",
          padding: "5px 20px",
          position: "absolute",
          right: "60px",
          top: "8px",
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography>Filter</Typography>
          <IconButton onClick={() => setOpen(!open)}>
            <IconCircleArrowUpFilled
              style={{
                rotate: open ? "180deg" : "0deg",
                transition: "0.5s",
              }}
            />
          </IconButton>
        </Box>
        <Collapse in={open} collapsedSize={0}>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Start date"
                    defaultValue={dayjs("2022-04-17")}
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                  />
                </DemoContainer>
              </Box>
              <Box>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                  />
                </DemoContainer>
              </Box>
            </LocalizationProvider>
          </Box>

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: "10px" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Collapse>
      </Paper>
    </Box>
  );
}
export default Filter;
