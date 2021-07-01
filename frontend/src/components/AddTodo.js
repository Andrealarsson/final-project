import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { API_URL } from "../reusable/urls";
import todos from "../reducers/todos";
import { 
  TodoForm, 
  TodoInput, 
  AddButton 
} from "./AddTodo.style";

const AddTodo = () => {
  const [items, setItems] = useState("");
  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();

  const onFormSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    };
    fetch(API_URL("users/checklist"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(todos.actions.addNewTodo({ items: data.items }));
          dispatch(todos.actions.setErrors(null));
        } else {
          dispatch(todos.actions.setErrors(data));
        }
      });
    setItems("");
  };

  return (
    <>
      <TodoForm onSubmit={onFormSubmit}>
        <AddButton
          type="submit"
          disabled={items.length < 3 || items.length > 40}
        >
          {" "}
          +{" "}
        </AddButton>
        <TodoInput
          type="text"
          required
          value={items}
          placeholder="Lägg till..."
          onChange={(e) => setItems(e.target.value)}
        />
      </TodoForm>
    </>
  );
};

export default AddTodo;