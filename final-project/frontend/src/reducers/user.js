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
      const {userId, username, accessToken, errors } = action.payload
        store.userId = userId
        store.username = username
        store.accessToken = accessToken
        store.errors = errors
   
    }
  }
})

export default user