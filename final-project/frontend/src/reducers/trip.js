import { createSlice } from '@reduxjs/toolkit';

const trip= createSlice({
    name: 'trip',
    initialState: {
        trip: [],
        errors: null
    },
    
    reducers: {
        setTrip: (store, action) => {
            store.trip = [ store.trip, ...action.payload ]

        },
        setErrors: (store, action) => {
            store.errors = action.payload
        }
    }
})

export default trip
