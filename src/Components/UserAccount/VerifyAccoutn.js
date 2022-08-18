import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Container, Box, Typography, Button } from "@mui/material";
import verified from "../../Asset/img/verified.gif";
import axios from "axios";
const btnStyle = {
  marginTop: "20px",
  height: "46px",
  padding: "8px",

  borderRadius: "25px",
  background: "#3765ec",
};

export default function VerifyAccount() {
  const { userid } = useParams();
  const navigate = useNavigate();
  const [isActive, setActive] = React.useState(false);
  useEffect(() => {
    setActive(true);
    // console.log(userid);
    axios
      .get(`https://ms.stagingsdei.com:4011/activate/user?userId=${userid}`)
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        //console.log(error);
      });
  }, [userid]);

  const handleContinue = () => {
    navigate("/login");
  };

  // const handleBack = () => {
  //   navigate("/login");
  // };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {isActive ? (
        <Container>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={verified} alt="loading..." height="600px" />
              <Typography variant="h4">
                Your account has been verified
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box sx={{ width: "480px" }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleContinue}
                  style={btnStyle}
                >
                  Continue to Log in
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      ) : null}
    </Box>
  );
}
