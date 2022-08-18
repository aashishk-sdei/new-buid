import * as React from "react";
import Box from "@mui/material/Box";
import { Menu } from "../../Constant/DummyData";
import { Link } from "@mui/material";

export default function DashboardLeftSidebar() {
  return (
    <>
      <div className="sidebar-menu">
        {Menu.map((menuItem, key) => {
          return (
            <>
              <Box
                key={menuItem.id}
              >
                <Link href={menuItem.link} underline="none" className="d-flex align-items-center menu-item">
                  <span>
                    {menuItem.icon}
                  </span>
                  <label>{menuItem.title}</label>
                </Link>
              </Box>
            </>
          );
        })}
      </div>
    </>
  );
}
