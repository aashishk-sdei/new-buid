import React from "react";
import { Typography, Paper, Box, Stack, Grid } from "@mui/material";
import { ReactComponent as BarChart } from "../../Asset/img/chart-bar-type.svg";
import { ReactComponent as PetFoot } from "../../Asset/img/icons/font-icon-done/pet-foot-circle.svg";

export default function AverageVisitCard() {
  return (
    <>
      <Paper elevation={1} sx={{ p: 1 }}>
        <Grid container>
          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 1,
              }}
            >
              <Typography sx={{ fontSize: "18px", fontWeight: "Bold" }}>
                Average user Visit
              </Typography>
              <Typography>Monthly</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 1,
              }}
            >
              <BarChart />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              p={4}
            >
              <Stack
                spacing={4}
                sx={{
                  borderRadius: "15px",
                }}
              >
                <PetFoot />

                <Typography>This Month</Typography>
                <Typography>17</Typography>
                <Typography>-13%</Typography>
              </Stack>
              <Stack
                spacing={4}
                sx={{
                  borderRadius: "15px",
                }}
              >
                <PetFoot />
                <Typography variant="subtitle"> This Year</Typography>
                <Typography>17</Typography>
                <Typography>+38%</Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
