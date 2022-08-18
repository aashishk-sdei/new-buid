import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditUserDialogForm from "./EditUser";
import DeleteUser from "./DeleteUser";
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

export default function ListAlluser() {
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = useState(null);
  const [editData, setEditData] = useState({});

  // Delete 
  const [deleteopen, setDOpen] = React.useState(false);
  const [did, setdId] = useState(null);
  const [deleteData, setdeleteData] = useState({});

  const handleEdit = (data) => {
    setEditData(data);
    setOpen(true);
    
    setId(data.userId);
  };

  const handleClose = () => {
    setOpen(false);
    setDOpen(false);
    setEditData({})
    setdeleteData({})
  };

  const handleDelete = (data) => {
    setdeleteData(data);
    setDOpen(true);
    setdId(data.userId);
  }

  //   console.log("hy", elementIndex);
  //   console.log("user deleted");
  //   if (elementIndex > -1) {
  //     // only splice array when item is found
  //     data.splice(elementIndex, 1); // 2nd parameter means remove one item only
  //   }
  // };

  useEffect(() => {
    fetch("https://ms.stagingsdei.com:4011/user/list")
      .then((response) => {
        (async function () {
          let res = await response.json();
          // console.log("data", res.data.result);
          setData(res.data.result);
        })();
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow sx={{ color: "red" }}>
              <StyledTableCell align="left">Username</StyledTableCell>
              <StyledTableCell align="left">Company Name</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">First Name</StyledTableCell>
              <StyledTableCell align="left">Last Name</StyledTableCell>
              <StyledTableCell align="left">Phone</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, key) => (
              <StyledTableRow key={row.id} className={`inputid_${row.id}`}>
                <StyledTableCell component="th" scope="row">
                  {row.userName}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.companyName}
                </StyledTableCell>
                <StyledTableCell align="left">{row.email}</StyledTableCell>
                <StyledTableCell align="left">{row.firstName}</StyledTableCell>
                <StyledTableCell align="left">{row.lastName}</StyledTableCell>
                <StyledTableCell align="left">{row.phone}</StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton
                    aria-label="Edit"
                    color="primary"
                    // onClick={handleClickOpen}
                    onClick={() => handleEdit(row)}
                  >
                    <EditIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    onClick={() => handleDelete(row)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EditUserDialogForm
        handleEdit={handleEdit}
        handleClose={handleClose}
        open={open}
        data={editData}
        id={id}
      />
      <DeleteUser
        handleEdit={handleDelete}
        handleClose={handleClose}
        open={deleteopen}
        data={deleteData}
        id={did}
      />
    </>
  );
}
