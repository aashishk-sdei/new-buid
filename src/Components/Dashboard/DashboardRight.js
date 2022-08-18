import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { Data } from "../../Constant/DummyData";
import { Typography, Stack } from "@mui/material";
import Container from "@mui/material/Container";
import UserImage from "../../Asset/img/patient-profile-thumbnail.png";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function DashboardRight() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "flex-end",
        p: 3,
        gap: 2,
        borderRadius: "15px",
      }}
    >
      <Paper elevation={2} sx={{ height: "100px", width: "350px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
          m={2}
        >
          <Avatar
            alt="Remy Sharp"
            src={UserImage}
            sx={{ width: 60, height: 60 }}
          />
          <Stack pt={1}>
            <Typography>Rugger</Typography>
            <Typography variant="subtitle2">Male/Dog</Typography>
            <Typography variant="subtitle1">9:30 am - 6:30 pm</Typography>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
