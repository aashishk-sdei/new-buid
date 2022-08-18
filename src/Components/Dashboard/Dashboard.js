import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import DashboardLeftSidebar from "./DashboardLeftSidebar";
import DashboardMiddle from "./DashboardMiddle";
import DashboardRight from "./DashboardRight";
import Applogo from "../../Asset/img/logo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const rest = localStorage.getItem("ID");
  //console.log(rest);

  useEffect(() => {
    if (rest && rest != "" && rest != null) {
    } else {
      navigate("/login");
    }

    fetch("https://ms.stagingsdei.com:4011/user/active/inactive/count")
      .then((response) => {
        (async function () {
          let res = await response.json();
          // console.log("data", res.data.result);
          setData(res.data.result);
        })();
      })
      .catch((error) => {
        //console.log(error);
      });
  }, []);

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div className="dashboard-wrapper d-flex flex-column flex-fill overflow-auto">
        <header className="dashboard-header d-flex align-items-center">
          <div className="left-col">
            <Avatar src={Applogo} alt="Logo" className="test" />
          </div>
          <div className="right-col ms-auto">
            <div className="user-profile-cell d-inline-flex align-items-center">
              <span>Developer_22</span>
              <IconButton
                aria-label="delete"
                color="secondary"
                onClick={logOut}
              >
                <LogoutIcon />
              </IconButton>
            </div>
          </div>
        </header>
        <div className="inner-wrapper d-flex flex-fill overflow-auto">
          <div className="left-col d-flex flex-column flex-fill overflow-auto">
            <DashboardLeftSidebar />
          </div>
          <div className="right-col d-flex flex-column flex-fill overflow-auto">
            <DashboardMiddle />
            <div className="stats-wrapper">
              <img
                src={require("../../Asset/img/dashboard-screenshot.png")}
                alt="screenShot"
              />
            </div>
            {/* <DashboardRight /> */}
          </div>
        </div>
      </div>
    </>
  );
}
