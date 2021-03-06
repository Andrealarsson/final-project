import React, { useState } from "react";
import { useDispatch, useSelector, batch } from "react-redux";

import { API_URL } from "../reusable/urls";
import { AddButton } from "./AddTrip.style";
import tripReducer from "../reducers/trip";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const AddTrip = () => {
  const [open, setOpen] = useState(false);
  const [trip, setTrip] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const onFormSubmit = (e) => {
    e.preventDefault();

    const departure = `${date} ${time}`

    const options = {
      method: "POST",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ trip, departure}),
    };
    fetch(API_URL("users/trip"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(tripReducer.actions.setTrip(data.trip));
            dispatch(tripReducer.actions.setErrors(null));
          })
        } else {
          dispatch(tripReducer.actions.setErrors(data));
        }
      });

      setTrip("");
      setDate("");
      setTime("");
      handleClose();
    }
   
  return (
    <>
      <AddButton type="button" onClick={handleClickOpen}>
        +
      </AddButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Ny resa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Registrera din nya resa med destination, avresedatum och avresetid:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Destination"
            value={trip}
            type="destination"
            fullWidth
            onChange={(e) => setTrip(e.target.value)}
          />
           <TextField
            autoFocus
            margin="dense"
            id="name"
            label=""
            value={date}
            type="date"
            fullWidth
            onChange={(e) => setDate(e.target.value)}
          />
           <TextField
            autoFocus
            margin="dense"
            id="name"
            label=""
            value={time}
            type="time"
            fullWidth
            onChange={(e) => setTime(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            St??ng
          </Button>
          <Button onClick={onFormSubmit} color="primary">
            Spara
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddTrip