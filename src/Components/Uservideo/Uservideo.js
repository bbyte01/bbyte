import React, { useEffect, useState } from "react";
import "./uservideo.css";
import axios from "axios";
import img from "../../images/sea_img.jpg";
import Reels from "./Reels";
import {
  Avatar,
  Box,
  Card,
  Chip,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { Config } from "../../Config/config";
import { IconCircleX, IconTrash } from "@tabler/icons-react";
import { useParams } from "react-router-dom";

const { API_URL } = Config;

function Uservideo() {
  const { userId } = useParams();
  const [userVideo, setUserVideo] = useState([]);
  const [userData, setUserData] = useState({});
  const [open, setOpen] = useState(false);
  const [singleReelData, setSingleReelData] = useState({});

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (e) => {
    setOpen(true);
    setSingleReelData(e);
  };

  const handleChangeStatus =(user_id, status)  =>{
    console.log('status', status)
    let config ={
      method : 'patch',
      url: `${API_URL}user/${user_id}/status`,
      headers : {
        'Authorization' : `Bearer ${localStorage.getItem('token')}`,
      },
      data : {
        status : status === 'active' ? 'inactive' : 'active'
      }
    }
    axios.request(config)
    .then((response) => {
      getUserData()
      console.log('repsonse', response);
    })
    .catch((error) => {
      console.log(error);
    });
  }
 
const deletepost =(user_id , public_id) =>{
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `${API_URL}post/${user_id}?public_id=${public_id}`,
    headers: { 
      'Accept': 'application/json', 
      'Authorization': 'Bearer '}
  };
  
  axios.request(config)
  .then((response) => {
    // console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
}
  const getUserData = () => {
    let config = {
      method: "get",
      url: `${API_URL}user/${userId}`,
      // headers: { }
    };

    axios
      .request(config)
      .then((response) => {
        setUserData(response.data);
        // console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getUserVideo = () => {
    let config = {
      method: "get",
      url: `${API_URL}post/${userId}/user`,
    };

    axios(config).then((response) => {
      setUserVideo(response.data);
    });
  };
  useEffect(() => {
    getUserData();
    getUserVideo();
  }, [userId]);

  return (
    <div className="heading-uservideo">
      <Dialog fullWidth maxWidth="lg" open={open}>
        <DialogContent
          sx={{
            padding: "0px",
            background: "#000",
            position: "relative",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              right: "10px",
              top: "10px",
            }}
            onClick={handleClose}
          >
            <IconCircleX color="#fff" />
          </IconButton>
          <Reels singleReelData={singleReelData} />
        </DialogContent>
      </Dialog>

      <h2>User</h2>
      <Grid container>
        <Grid item md={2}>
          <Avatar
            sx={{
              height: "150px",
              width: "150px",
            }}
          />
        </Grid>
        <Grid item md={10}>
          <Grid container>
            <Grid item md={2} sm={12} xs={12}>
              <Typography class="userinfo">User name</Typography>
              <Typography>{userData.username}</Typography>
            </Grid>
            <Grid item md={2} sm={12} xs={12}>
              <Typography class="userinfo">Name</Typography>
              <Typography>{userData.name}</Typography>
            </Grid>
            <Grid item md={2} sm={12} xs={12}>
              <Typography class="userinfo">Joining Date</Typography>
              <Typography>{userData.created_at}5/04/2024</Typography>
            </Grid>
            <Grid item md={2} sm={12} xs={12}>
              <Typography class="userinfo">Total Videos</Typography>
              <Typography>{userData.post_count}</Typography>
            </Grid>
            <Grid item md={2} sm={12} xs={12}>
              <Typography class="userinfo">Total like</Typography>
              <Typography>{userData.like_count}</Typography>
            </Grid>
            <Grid item md={2} sm={12} xs={12}>
              <Typography class="userinfo">Status</Typography>
              <Chip onClick={()=> handleChangeStatus(userData.id, userData.status)} label={userData.status} color={userData.status === 'active' ? 'success' : 'error'} />
              {/* <Typography>{userData.status}</Typography> */}
            </Grid>
            <Grid item md={3} sm={12} xs={12}>
              <Typography>{userData.following_count}</Typography>
              <Typography class="userinfo">Following</Typography>
            </Grid>
            <Grid item md={3} sm={12} xs={12}>
              <Typography>{userData.follower_count}</Typography>
              <Typography class="userinfo">Followers</Typography>
            </Grid>
            <Grid item md={3} sm={12} xs={12}>
              <Typography>0</Typography>
              <Typography class="userinfo">like</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div>Bio...............................................</div>
      <div>
        Links..................................................................
      </div>

      <Grid container spacing={2}>
        {userVideo.map((i) => (
          <Grid item md={4} key={i} sm={12} xs={12}>
            <Paper>
              {/* <img class="img_uservideo" src={img} /> */}
              <Card  onClick={() => handleOpen(i)}
                sx={{
                  minWidth: 300,
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
              </Card >
              <Box display='flex' alignItems='center' justifyContent='space-between' p='20px 10px'>

              <Typography level="body-lg" fontWeight="lg" textColor="#fff" >
                {i.caption}
              </Typography>
              <IconTrash onClick={() =>deletepost(i.user_id, i.public_id)}/>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Uservideo;
