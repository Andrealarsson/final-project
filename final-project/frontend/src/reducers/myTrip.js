import { createSlice } from '@reduxjs/toolkit';

const myTrip= createSlice({
    name: 'myTrip',
    initialState: {
        destination: null, 
        departureDate: null, 
        departureTime: null,
        errors: null
    },
    reducers: {
        setTrip: (store, action) => {
        const {destination, departureDate, departureTime } = action.payload
          store.destination = destination
          store.detartureDate = departureDate
          store.departureTime = departureTime  
        },
        setErrors: (store, action) => {
            store.errors = action.payload
        }
    }
})

export default myTrip
