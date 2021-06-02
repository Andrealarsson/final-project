import { createSlice } from '@reduxjs/toolkit';

const myTrip= createSlice({
    name: 'myTrip',
    initialState: {
        items: [],
        errors: null
    },
    reducers: {
        setTrip: (store, action) => {
            store.items = action.payload
            
        },
        setErrors: (store, action) => {
            store.errors = action.payload
        }
    }
})

export default myTrip