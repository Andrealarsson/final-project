import { createSlice } from '@reduxjs/toolkit';

const trip= createSlice({
    name: 'trip',
    initialState: {
        trip: [],
        errors: null
    },
    
    reducers: {
        setTrip: (store, action) => {
            store.trip = [ ...action.payload ]
            // store.trip = [ ...store.trip, ...action.payload ]

        },
        setErrors: (store, action) => {
            store.errors = action.payload
        }
    }
})

export default trip 
// Thunk for adding a note
// `http://localhost:8080/users/${userId}/note`
/*
export const addTrip = (userId) => {
    return(dispatch) => {
        fetch(API_URL(`users/${userId}/trip`), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => res.json())
        .then(data => {
          if(data.success) { 
            dispatch(trip.actions.setTrip(data.trip))
            dispatch(trip.actions.setErrors(null))
          } else {
            dispatch(trip.actions.setErrors(data))
          }
      })
     .catch()
     .finally(() => {
        dispatch(getTrip(userId));
    })
}}*/
/*
// `http://localhost:8080/users/${userId}/note`
export const getTrip = (userId) => {
    return(dispatch) => {
        fetch(API_URL(`users/${userId}/trip`), {
            method: "GET",
            // headers: { "Content-Type": "application/json" },
            headers: {
                Authorization: accessToken
              },
        })
        .then((res) => res.json())
        .then(data => {
          if(data.success) { 
            dispatch(trip.actions.setTrip(data.trip))
            dispatch(trip.actions.setErrors(null))
          } else {
            dispatch(trip.actions.setErrors(data))
          }
      })
     .catch()
}}*/


