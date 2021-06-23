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
      store.items = action.payload.items;
    },
    setErrors: (store, action) => {
      store.errors = action.payload;
    },
  },
});

export default todos;