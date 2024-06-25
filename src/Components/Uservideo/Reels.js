import React, { useEffect, useState } from "react";
// import {Formik}  from '@mui/material'
import { Box, Divider, Grid, Typography } from "@mui/material";
import img from "../../images/sea_img.jpg";
import { Config } from "../../Config/config";
import { useParams } from "react-router-dom";

import axios from "axios";
import { IconHeart } from "@tabler/icons-react";
const { API_URL } = Config;

function Reels({singleReelData}) {
  const { userId } = useParams();
  const [userReels, setuserReels] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const getUserReel = () => {
    let config = {
      method: "get",
      url: `${API_URL}api/post/architabcd/${userId}`,
    };
    axios
      .request(config)
      .then((response) => {
        getUserReel(response.data);
        // console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getUserReel();
  }, []);

  return (
    <div>
      <Grid container spacing={0}>
        
        <Grid item lg={6} sm={12} xs={12}>
          <Box onClick={handleOpen}>
            <video style={{ height: "600px", width: "100%" }} playsinline autoPlay controls src={singleReelData.file_url}/>
          </Box>
        </Grid>
        {[0].map((i) => (
          <Grid item lg={6} key={i} sm={12} xs={12}>
            <Box sx={{ p: "20px", height : '90%', mt : "60px" }}>
              {
                singleReelData.comments.map((comment)=> (
                  <Box key={`comment-${comment.id}`}>
                    <Typography color="#fff">{comment.comment}</Typography>
                    <Box
                      display="flex"
                      alignItems="center"
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <IconHeart color="red" size={15} />
                        <Typography color="#fff" sx={{ml : '2px'}}>
                          {comment.comment_like_count}
                        </Typography>
                      </Box>
                    </Box>
                    <Divider sx={{backgroundColor : '#fff', m : '10px 0'}} />
                  </Box>
                ))
              }
              {/* <Typography color="#fff">user205620</Typography>
              <Typography color="#fff">view</Typography>
              <Typography color="#fff">user5452154</Typography> */}
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Reels;