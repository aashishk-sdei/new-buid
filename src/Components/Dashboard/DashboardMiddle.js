import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Data } from "../../Constant/DummyData";
import Card from "../Cards/Card";
import { Typography, Button } from "@mui/material";
import Container from "@mui/material/Container";
import AverageVisitCard from "../Cards/AverageVisitCard";
import ActiveCardlist from "../Cards/ActiveCardList";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function DashboardMiddle() {
  return (
    <>
      <Card />

      {/* <div className="chart-stats-blc">
        <AverageVisitCard />
        <ActiveCardlist />
      </div> */}
    </>
  );
}
