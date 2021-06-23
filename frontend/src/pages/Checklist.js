import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useHistory } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";

import { API_URL } from "../reusable/urls";
import todos from "../reducers/todos";
import AddTodo from "../components/AddTodo";
import Navbar from "../components/Navbar";
import checklist from "../assets/checklist.png";
import bin from "../assets/bin.png";
import { 
  TodoSection, 
  TitleContainer, 
  TodoIcon, 
  TodoTitle, 
  TodoListContainer, 
  TodoItem, 
  TodoDescription, 
  RemoveButton 
} from "./Checklist.style";

const Checklist = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const todosItems = useSelector((store) => store.todos.items);
  const errors = useSelector((store) => store.todos.errors);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      history.push("/");
    }
  }, [accessToken, history]);

  const getOptions = useCallback((method) => {
    return {
      method: method,
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json'
      },
    };
  }, [accessToken]);

  useEffect(() => {
    fetch(API_URL("users/checklist"), getOptions('GET'))
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(todos.actions.setItems(data.items));
          dispatch(todos.actions.setErrors(null));
        } else {
          dispatch(todos.actions.setErrors(data));
        }
      })
      .catch(errors);
  }, [accessToken, getOptions, dispatch, history, errors]);

  const onClickDelete = (todoId) => {
    fetch(API_URL(`users/checklist/${todoId}`), getOptions('DELETE'))
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(todos.actions.setItems(data.items));
            dispatch(todos.actions.setErrors(null));
          });
        } else {
          dispatch(todos.actions.setErrors(data));
        }
      });
  };

  const onClickComplete = (todo) => {
    fetch(API_URL(`users/checklist/${todo._id}`), {
      ...getOptions('PATCH'),
      body: JSON.stringify({
        isComplete: !todo.isComplete
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(todos.actions.setItems(data.items))
            dispatch(todos.actions.setErrors(null));
          });
        } else {
          dispatch(todos.actions.setErrors(data));
        }
      });
  };

  return (
    <>
      <TodoSection>
        <Navbar />
        <TitleContainer>
          <TodoIcon
            src={checklist}
            width="20"
            height="20"
            alt="checklist icon"
          />
          <TodoTitle>CHECKLISTA</TodoTitle>
        </TitleContainer>
        <TodoListContainer>
          {todosItems.map((todo) => (
            <TodoItem key={todo._id}>
              <Checkbox
                color="default"
                type="checkbox"
                checked={todo.isComplete}
                onChange={() =>
                  onClickComplete(todo)
                }
              />
              <TodoDescription
                style={{
                  textDecoration: todo.isComplete ? "line-through" : "",
                }}
              >
                {todo.description}
              </TodoDescription>
              <RemoveButton
                type="button"
                onClick={() => onClickDelete(todo._id)}
              >
                <img src={bin}
                    width="18"
                    height="18"
                    alt="bin icon"
                  />
              </RemoveButton>
            </TodoItem>
          ))}
        </TodoListContainer>
        <AddTodo />
      </TodoSection>
    </>
  );
};

export default Checklist;