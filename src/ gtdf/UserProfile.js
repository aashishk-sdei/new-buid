import React, { useState, useEffect } from "react";
import UserImage from "../../Asset/img/patient-profile-thumbnail.png";

import {
  Grid,
  Typography,
  Container,
  Avatar,
  Stack,
  Box,
  Paper,
  Button,
} from "@mui/material";

import Divider from "@mui/material/Divider";

const btnStyle = {
  marginTop: "20px",
  borderRadius: "25px",
};

export default function UserProfile() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://ms.stagingsdei.com:4011/user/list")
      .then((response) => {
        (async function () {
          let res = await response.json();
          console.log("this is res object", res.data[0]);
          setData(res.data);
        })();
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={4}
            sx={{
              height: "75vh",
              borderRadius: "25px",
              background: "#abbcff03",
            }}
          >
            <Grid container spacing={2} p={3} mt={14}>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  disabled
                  textAlign="right"
                  style={btnStyle}
                >
                  Profile
                </Button>
                <Box
                  spacing={3}
                  p={5}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    sx={{ width: 156, height: 156 }}
                    src={UserImage}
                    elevation={2}
                  />
                </Box>
                <Divider />
              </Grid>
              <Grid item xs={6} mt={4}>
                <Stack spacing={3} p={5}>
                  <Typography variant="body1">First Name: Abhishek </Typography>
                  <Typography variant="body1">Last Name: Singh </Typography>
                  <Typography variant="body1">Username: Abx007 </Typography>
                  <Typography variant="body1">Email: Xyz@gmail.com </Typography>
                </Stack>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item xs={5} mt={4}>
                <Stack spacing={3} p={5}>
                  <Typography variant="body1">Company Name: Amazon </Typography>
                  <Typography variant="body1">Phone: +9125344949</Typography>
                  <Typography variant="body1"> Dob: 27/07/2022</Typography>
                  <Typography variant="body1">
                    About: John Lorem Ipsum is simply dummy text of the printing
                    and typesetting industry.
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
