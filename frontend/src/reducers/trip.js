import { createSlice } from "@reduxjs/toolkit";

const trip = createSlice({
  name: "trip",
  initialState: {
    trip: [],
    errors: null,
  },

  reducers: {
    setTrip: (store, action) => {
      store.trip = [...action.payload];
      // store.trip = [ ...store.trip, ...action.payload ]
    },
    // addNewTrip: (store, action) => {
    //   store.trip = [...store.trip, action.payload];
    // },
    // removeTrip: (store, action) => {
    //   const removeTrip = store.trip.filter(
    //     (trip) => trip._id !== action.payload
    //   );
    //   store.trip = removeTrip;
    // },
    setErrors: (store, action) => {
      store.errors = action.payload;
    },
  },
});

export default trip;
