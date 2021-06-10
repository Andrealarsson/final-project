import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
  name: 'user',
  initialState: {
    userId: null,
    username: null,
    accessToken: null,
    status: null,
    errors: null
  },
    reducers: {
    setUser: (store, action) => {
      const {userId, username, status, accessToken, errors } = action.payload
        store.userId = userId
        store.username = username
        store.accessToken = accessToken
        store.status = status
        store.errors = errors
   
    }
  }
})

export default user