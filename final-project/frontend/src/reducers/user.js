import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
  name: 'user',
  initialState: {
    userId: null,
    username: null,
    accessToken: null,
    errors: null
  },
    reducers: {
    setUser: (store, action) => {
      const {userId, username, accessToken } = action.payload
        store.userId = userId
        store.username = username
        store.accessToken = accessToken
      },
      setErrors: (store, action) => {
          store.errors = action.payload
   
    }
  }
})

export default user