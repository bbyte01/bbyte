import react, { useEffect, useState } from "react";
import axios from "axios";

import {
  Avatar,
  Chip,
  Grid,
  IconButton,
  TextField,
  Card,
  Typography,
} from "@mui/material";

import img from "../../images/sea_img.jpg";
import backimg from "../../images/back_img1.png";
import { Config } from "../../Config/config";
import { Link, useParams } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Box,
} from "@mui/material";
import { IconBrandYoutube, IconPlayerPlay } from "@tabler/icons-react";
const { API_URL } = Config;

function Totalvideo() {
  const [totalvideo, setTotalVideo] = useState([]);
  const { userId } = useParams();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const getTotalVideo = () => {
    let config = {
      method: "get",
      url: `${API_URL}post/all`,
      // headers: { }
    };

    axios
      .request(config)
      .then((response) => {
        setTotalVideo(response.data);
        // console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTotalVideo();
  }, []);
  return (
    <div className="heading-uservideo">
      <h2>Total videos table</h2>
      <TextField
        select
        labelId="demo-select-small-label"
        id="demo-select-small"
        // value={age}
        label="User"
        size="small"
        sx={{
          width: "100px",
          m: "20px 0",
        }}
        // onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>New joined user</MenuItem>
        <MenuItem value={20}>one month </MenuItem>
        <MenuItem value={30}>one year</MenuItem>
      </TextField>
      <Grid container spacing={2}>
        {totalvideo.map((i) => (
          <Grid item md={3} key={i} sm={12} xs={12}>
            <Link to={`/uservideo/${i.user.username}`}>
            <Box onClick={handleOpen} sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  bottom: "50px",
                  left: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton>
                  <IconPlayerPlay color="#fff" />
                </IconButton>
                <Typography color="#fff">12</Typography>
              </Box>
              <Box>
                <Card
                  sx={{
                    // minWidth: 300,
                    flexGrow: 1,
                    height: "350px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <video
                    // autoPlay
                    loop
                    height="100%"
                    width="100%"
                    style={{
                      objectFit: "fill",
                    }}
                    muted
                    // poster="https://assets.codepen.io/6093409/river.jpg"
                  >
                    <source src={i.file_url} type="video/mp4" />
                  </video>
                </Card>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mt="10px"
              >
                <Box display="flex" alignItems="center">
                  <Avatar
                    sx={{
                      width: "24px",
                      height: "24px",
                      mr: "5px",
                    }}
                  />
                  <Box>
                    <Typography variant="h1" fontSize={14} fontWeight={500}>
                      {i.user.username}
                    </Typography>
                    <Typography variant="h2" fontSize={10}>
                      12 Apr, 2023
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center">
                  <Typography sx={{ mr: "5px" }}>12</Typography>
                  <IconBrandYoutube />
                </Box>
              </Box>
            </Box>
            </Link>
           
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Totalvideo;
