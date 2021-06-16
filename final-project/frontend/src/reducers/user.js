import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
  name: 'user',
  initialState: {
    userId:/*localStorage.userId || */null,
    username:/*localStorage.userId ||*/ null,
    accessToken: /*localStorage.userId ||*/ null,
    errors: null
  },
    reducers: {
    setUser: (store, action) => {
      const {userId, username, accessToken } = action.payload
      /*localStorage.setItem('userId', userId, 'username', username, 'accessToken', accessToken )*/
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