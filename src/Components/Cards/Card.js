import React from "react";

import {
  Typography,
  Paper,
  Box,
  Stack
}

  from "@mui/material";

import {
  Data
}

  from "../../Constant/DummyData";

export default function Card() {
  return (<> <div className="breif-blc"> <div className="row-blc d-flex"> {
    Data.map((dataItem, key) => {
      return (<> <div className="breif-cell-wrapper d-flex flex-column flex-fill">
        <div className="breif-cell flex-fill"

          key={
            dataItem.title
          }

        > <div className="head d-flex align-items-center">
            <div className="text">
              {
                dataItem.number
              }

            </div>
            <div className="icon ms-auto">
              <span>
                {
                  dataItem.icon
                }

              </span>
            </div>
          </div>
          <div className="inner">
            {
              dataItem.title
            }

          </div> </div> </div> </>);
    }

    )
  }

  </div> </div> </>);
}