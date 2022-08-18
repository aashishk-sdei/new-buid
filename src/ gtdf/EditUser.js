import React, { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";

export default function EditUserDialogForm({ handleClose, open, data, id }) {
  //const [fname, setFirstName] = useState("");
  console.log(data,"====data")
  const [email, setEmail] = useState(data.email)
  const [fname, setfname] = useState( data.firstName)
  const [lname, setlname] = useState(data.lastName)
  const [uname, setUname] = useState(data.userName)
  const [cname, setCname] = useState(data.companyName)
  const [phone, setPhone] = useState(data.phone)

  const handleSubmit = () => {
    console.log(email,"email",fname,"fname",lname,"lname",uname,"uname",cname,"cname",phone)
  }

  return (
    <div>
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
                label="Username"
                onChange={(e) => setUname(e.target.value)}
                value={uname}
                type="text"
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                onChange={(e)=>setEmail(e.target.value)}
                id="name"
                value={email}
                label="Email "
                type="email"
                fullWidth
              />

              <TextField
                autoFocus
                margin="dense"
                id="name"
                onChange={(e) => setfname(e.target.value)}
                value={fname}
                label="Fisrt Name"
                type="text"
                fullWidth
              />

              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Last Name"
                onChange={(e) => setlname(e.target.value)}
                value={lname}
                type="text"
                fullWidth
              />

              <TextField
                autoFocus
                margin="dense"
                id="companyname"
                onChange={(e) => setCname(e.target.value)}
                label="Company Name"
                type="text"
                value={cname}
                fullWidth
              />

              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Phone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                type="number"
                fullWidth
              />
            </form>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
