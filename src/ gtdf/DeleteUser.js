import React, { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function DeleteUser({ handleClose, open, data, id }) {
  //const [fname, setFirstName] = useState("");
  const [email, setEmail] = useState(data ? data.email : "");

  const handleSubmit = () => {
    console.log(email, "email");
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle variant="h4">Delete User</DialogTitle>
        <DialogContent>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Delete User
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
