import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { Avatar, Box, Grid } from "@mui/material";
import Screenshotdialog from "./Screenshotdialog";
import axios from "axios";
import { Config } from "../../Config/config";
const { API_URL } = Config;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    margin: "10px 40px",
    borderRadius: "8px",
    padding: theme.spacing(2),
    backgroundColor: "#fff",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    backgroundColor: "#EEEEEE",
  },
}));

export default function ReportDialog({
  open,
  handleClose,
  reportData,
  getReport,
}) {
  const [openScreenShot, setOpen] = React.useState(false);
  const [list, setList] = useState([]);
  // const [status ,setStatus] =useState()
  const handleScreenShotClose = () => {
    setOpen(false);
  };
  const handleOpen = (e) => {
    setOpen(true);
    setList(e);
  };
  const markComplete = () => {
    const config = {
      method: "put",
      url: `${API_URL}report/${reportData?.id}/status`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        status: "completed",
      },
    };

    axios(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        getReport();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="sm"
        fullWidth
      >
        <Box display="flex" alignItems="center" ml="20px">
          <Avatar src={reportData?.reporter?.profile_picture} />
          <DialogTitle
            sx={{ m: 0, p: 2, textTransform: "capitalize" }}
            id="customized-dialog-title"
          >
            {reportData?.reporter?.name}
          </DialogTitle>
        </Box>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <IconSquareRoundedX />
        </IconButton>
        <DialogContent>
          <Typography gutterBottom>{reportData?.report_description}</Typography>
          <Box sx={{ mt: "30px" }}>
            <Grid
              container
              spacing={2}
              onClick={() => handleOpen(reportData?.report_files)}
            >
              {reportData?.report_files?.map((i) => (
                <Grid item md={1}>
                  <Box
                    sx={{
                      backgroundImage: `url(${i.files})`,
                      height: "30px",
                      width: "100%",
                      backgroundSize: "cover",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={markComplete}>
            Completed
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <Screenshotdialog
        open={openScreenShot}
        handleClose={handleScreenShotClose}
        list={list}
      />
    </React.Fragment>
  );
}
