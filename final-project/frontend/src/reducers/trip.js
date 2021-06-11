import { createSlice } from '@reduxjs/toolkit';

const trip= createSlice({
    name: 'trip',
    initialState: {
    trip: [{
        _id: null,
        destination: null, 
        departureDate: null, 
        departureTime: null,
    }],
        errors: null
    },
    
    reducers: {
        setTrip: (store, action) => {
        const { _id, destination, departureDate, departureTime } = action.payload
          store.trip._id = _id
          store.trip.destination = destination
          store.trip.detartureDate = departureDate
          store.trip.departureTime = departureTime  
        },
        setErrors: (store, action) => {
            store.errors = action.payload
        }
    }
})

export default trip
