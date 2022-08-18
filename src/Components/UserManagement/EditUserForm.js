import React, { useState, useContext } from "react";
import { UserContext } from "../../Context/UserContext";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";

export default function EditUserForm({ open, handleClose, theUser }) {
  const { updateUser } = useContext(UserContext);

  const id = theUser.userId;

  const [uname, setUsername] = useState(theUser.userName);
  const [email, setEmail] = useState(theUser.email);
  const [fname, setFname] = useState(theUser.firstName);
  const [lname, setLname] = useState(theUser.lastName);
  const [cname, setCname] = useState(theUser.companyName);
  const [phone, setPhone] = useState(theUser.phone);

  const updatedUser = { id, fname, lname, cname, email, phone, uname };

  const handleSubmit = (e) => {
    // console.log('hey')
    e.preventDefault();
    updateUser(id, updatedUser);
    handleClose();
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle variant="h4">Edit Details</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              width: "500px",
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <form>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                value={uname}
                name="uname"
                label="Username"
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                value={fname}
                name="fname"
                label="First Name"
                onChange={(e) => setFname(e.target.value)}
                type="text"
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                value={lname}
                name="lname"
                label="Last Name"
                onChange={(e) => setLname(e.target.value)}
                type="text"
                fullWidth
              />

              <TextField
                autoFocus
                margin="dense"
                id="name"
                value={cname}
                name="cname"
                label="Company Name"
                onChange={(e) => setCname(e.target.value)}
                type="text"
                fullWidth
              />

              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="email"
                value={email}
                label="Email "
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                fullWidth
              />

              <TextField
                autoFocus
                margin="dense"
                id="name"
                value={phone}
                name="phone"
                label="Phone"
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
              />
            </form>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
