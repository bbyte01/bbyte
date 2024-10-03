import { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Grid, Card, Typography } from "@mui/material";
import { Config } from "../../Config/config";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
const { API_URL } = Config;

function Totalvideo() {
  const [totalvideo, setTotalVideo] = useState([]);

  const getTotalVideo = () => {
    let config = {
      method: "get",
      url: `${API_URL}post/all`,
    };

    axios
      .request(config)
      .then((response) => {
        setTotalVideo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTotalVideo();
  }, []);

  const uniqueUsers = totalvideo.filter((item, index, self) => {
    return index === self.findIndex((t) => t.user_id === item.user_id);
  });

  console.log("total video", totalvideo);
  return (
    <div className="heading-uservideo">
      <h2>User Videos</h2>
      <Grid container spacing={2}>
        {uniqueUsers.map((post) => (
          <Grid item md={3} key={post.user_id} sm={12} xs={12}>
            <Link to={`/uservideo/${post.user.username}`}>
              <Box sx={{ position: "relative" }}>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "20px",
                    left: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                  src={post.user.profile_picture}
                    sx={{
                      width: "24px",
                      height: "24px",
                      mx: "5px",
                    }}
                  />
                  <Typography color="#cfd8dc">{post.user.name}</Typography>
                </Box>
                <Card
                  sx={{
                    flexGrow: 1,
                    height: "350px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <video
                    loop
                    height="100%"
                    width="100%"
                    style={{ objectFit: "fill" }}
                    muted
                  >
                    <source src={post.file_url} type="video/mp4" />
                  </video>
                </Card>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Totalvideo;
