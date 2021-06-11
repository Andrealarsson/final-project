import { createSlice } from '@reduxjs/toolkit'

const todos = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    errors: null
  },

  reducers: {
    setItems: (store, action) => {
      store.items = [ action.payload, ...store.items]
      //maybee store.todos?

    },
    setErrors: (store, action) => {
      store.errors = action.payload
    }
    /*
    setItems: (store, action) => {
      store.items = action.payload
    
    }*/
  
  /*
    setErrors: (store, action) => {
      const { errors } = action.payload
      store.errors = errors
  },/*
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
    } */
  }
})
 
export default todos


