import { createSlice } from '@reduxjs/toolkit'

const todos = createSlice({
  name: 'todos',
  initialState: {
  items: {
    _id: null,
    description: null,
    createdAt: null,
    isComplete: null,
    errors: null
  }},

  reducers: {
    setItems: (store, action) => {
      const { _id, description, createdAt, isComplete } = action.payload
      store.items._id = _id
      store.items.description = description
      store.items.createdAt = createdAt
      store.items.isComplete = isComplete
    },
    setErrors: (store, action) => {
      store.errors = action.payload
  },
    toggleComplete: (store, action) => {
      const updatedItems = store.items.map(todo => {
        if (todo.id === action.payload){
          return {
            ...todo, 
            isComplete: !todo.isComplete
          }
        } else {
            return todo
        }
      })
      store.items=updatedItems
    },
    removeTodo: (store, action) => {
      const decreasedItems= store.items.filter(todo => todo.id !== action.payload)
      store.items = decreasedItems
    },
    addTodo: (store,action) => {
      store.items= [...store.items, action.payload]
    },
    removeAll: (store) => {
      let emptyArray = store.items
      emptyArray.length = 0
    } 
  }
})
 
export default todos


