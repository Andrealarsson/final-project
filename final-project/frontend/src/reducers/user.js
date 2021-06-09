import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
  name: 'user',
  initialState: {
    userID: null,
    username: null,
    accessToken: null,
    status: null,
    errors: null
  },
    reducers: {
    setUser: (store, action) => {
      const {userID, username, status, accessToken, errors } = action.payload
        store.userID = userID
        store.username = username
        store.accessToken = accessToken
        store.status = status
        store.errors = errors
   
    }
  }
})

export default user