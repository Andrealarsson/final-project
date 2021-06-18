import { createSlice } from '@reduxjs/toolkit'

const todos = createSlice({
  name: 'todos',
  initialState: {
    items: /*localStorage.taskId ||*/ [],
    errors: null
  },

  reducers: {
    setItems: (store, action) => {
      /*localStorage.setItem('[]', [])*/
      store.items = [ ...action.payload ]
    },
    addNewTodo: (store,action) => {
      store.items = [...store.items, action.payload]
    },
    setErrors: (store, action) => {
      store.errors = action.payload
    },
    toggleComplete: (store, action) => {
      const updatedItems = store.items.map(todo => {
        if (todo._id === action.payload){
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
      const removeItems= store.items.filter(todo => todo._id !== action.payload)
      store.items = removeItems
    },
    
    // removeAll: (store) => {
    //   let emptyArray = store.items
    //   emptyArray.length = 0
    // } 
  }
})
 
export default todos


