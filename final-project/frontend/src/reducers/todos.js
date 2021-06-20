import { createSlice } from "@reduxjs/toolkit";

const todos = createSlice({
  name: "todos",
  initialState: {
    items: [],
    errors: null,
  },

  reducers: {
    setItems: (store, action) => {
      store.items = [...action.payload];
    },
    addNewTodo: (store, action) => {
      store.items = [...store.items, action.payload];
    },
    toggleComplete: (store, action) => {
      const updatedItems = store.items.map((todo) => {
        if (todo._id === action.payload) {
          return {
            ...todo,
            isComplete: !todo.isComplete,
          };
        } else {
          return todo;
        }
      });
      store.items = updatedItems;
    },
    removeTodo: (store, action) => {
      const removeItem = store.items.filter(
        (todo) => todo._id !== action.payload
      );
      store.items = removeItem;
    },
    setErrors: (store, action) => {
      store.errors = action.payload;
    },
  },
});

export default todos;
