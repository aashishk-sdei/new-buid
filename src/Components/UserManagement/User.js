import React, { useState, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import { UserContext } from "../../Context/UserContext";
import EditUserForm from "./EditUserForm";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteUser from "./DeleteUserModal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export default function User({ user }) {
  const [open, setOpen] = useState(false);
  const [deleteopen, setDOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickDelOpen = () => {
    setDOpen(true);
  };

  const handleDelClose = () => {
    setDOpen(false);
  };

  const { deleteUser } = useContext(UserContext);

  return (
    <>
      <StyledTableCell align="left">{user.companyName}</StyledTableCell>
      <StyledTableCell align="left">{user.email}</StyledTableCell>
      <StyledTableCell align="left">{user.firstName}</StyledTableCell>
      <StyledTableCell align="left">{user.lastName}</StyledTableCell>
      <StyledTableCell align="left">{user.phone}</StyledTableCell>
      <StyledTableCell align="right">
        <IconButton aria-label="Edit" color="primary" onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
      </StyledTableCell>
      <StyledTableCell align="right">
        <IconButton
          className="trash-icon"
          aria-label="delete"
          onClick={handleClickDelOpen}
        >
          <DeleteIcon />
        </IconButton>
      </StyledTableCell>
      <EditUserForm
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
        theUser={user}
      />

      <DeleteUser
        open={deleteopen}
        handleClose={handleDelClose}
        theUser={user}
      />
    </>
  );
}
