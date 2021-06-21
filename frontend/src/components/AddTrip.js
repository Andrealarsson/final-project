import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";

import { API_URL } from "../reusable/urls";
import trip from "../reducers/trip";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AddTrip = () => {
  const [open, setOpen] = useState(false);
  const [trip, setTrip] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const userId = useSelector((store) => store.user.userId);
  const accessToken = useSelector((store) => store.user.accessToken);
  const errors = useSelector((store) => store.todos.errors);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const onFormSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ trip, departure: date, time}),
    };
    fetch(API_URL("users/trip"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log( data.success);
          console.log( 'post', data.trip);
          dispatch(trip.actions.addNewTrip({ trip: data.trip }));
          dispatch(trip.actions.setErrors(null));
        } else {
          dispatch(trip.actions.setErrors(data));
        }
      });
    setTrip("");
    setDate("");
    setTime("");
  }

  return (
    <>
      <AddButton type="button" onClick={handleClickOpen}>
        +
      </AddButton>
      {/* <Button variant="contained" color="default" onClick={handleClickOpen}>
        REGISTRERA NY RESA
      </Button> */}
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
            Stäng
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

const AddButton = styled.button`
position: absolute;
bottom: 20px;
background-color: rgba(0, 0, 0, 0.56);
color: #ffffff;
height: 65px;
width: 65px;
font-size: 40px;
margin-top: 20px;
border-radius: 50px;
border: none;
padding: 0px;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
outline: none;
&:hover {
  color: #7497AD;`