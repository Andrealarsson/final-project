import React, { useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import Checkbox from "@material-ui/core/Checkbox";

import { API_URL } from "../reusable/urls";
import todos from "../reducers/todos";
import AddTodo from "../components/AddTodo";
import Navbar from "../components/Navbar";
import italycoast from "../assets/italycoast.jpg";
import italy from "../assets/italy.jpg";
import checklist from "../assets/checklist.png";

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

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };
    fetch(API_URL("users/checklist"), options)
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
  }, [accessToken, dispatch, history]);

  const onClickDelete = (todoId) => {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    };

    const options2 = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };

    fetch(API_URL(`users/checklist/${todoId}`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          batch(() => {
            dispatch(todos.actions.removeTodo(data.removeItem));
            dispatch(todos.actions.setErrors(null));
          });
        } else {
          dispatch(todos.actions.setErrors(data));
        }
      });
    return fetch(API_URL("users/checklist"), options2)
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
          <TodoTitle>Checklista</TodoTitle>
        </TitleContainer>
        <TodoListContainer>
          {todosItems.map((todo) => (
            <TodoItem key={todo._id}>
              <Checkbox
                color="default"
                type="checkbox"
                checked={todo.isComplete}
                onChange={() =>
                  dispatch(todos.actions.toggleComplete(todo._id))
                }
              />
              {/* <TimeAdded>
            {moment(todo.createdAt).format('ddd HH:mm')}
          </TimeAdded> */}
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
                ta bort
              </RemoveButton>
              {/* <RemoveButton onClick={() => dispatch(todos.actions.removeTodo(todo._id))}>
            Radera
          </RemoveButton>     */}
            </TodoItem>
          ))}
        </TodoListContainer>
        <AddTodo />
      </TodoSection>
    </>
  );
};

export default Checklist;

const TodoSection = styled.section`
  background-image: url("${italycoast}");
  background-size: cover;
  overflow: scroll;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (min-width: 1024px) {
    background-image: url("${italy}");
  }
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  align-items: center;
  margin-top: 120px;

  @media (min-width: 768px) {
    max-width: 800px;
  }
`;

const TodoIcon = styled.img`
  margin-right: 2px;
`;
const TodoTitle = styled.h2`
  color: #ffffff;
  font-size: 17px;
  margin: 0px;
`;
const TodoListContainer = styled.div`
  min-height: 300px;
  width: 80%;
  

  @media (min-width: 768px) {
    margin-top: 20px;
    max-width: 800px;
  }
`;
const TodoItem = styled.div`
  // position: relative;
  border-radius: 2px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  color: black;
  margin: 3px;
  padding: 5px;
`;
const TodoDescription = styled.p`
  margin: 0px;
  color: #414344;
  font-size: 14px;
`;

const TimeAdded = styled.p`
  font-size: 10px;
  // position: absolute;
  left: 50px;
  margin: 2px;

  @media (min-width: 768px) {
    font-size: 11px;
  }
`;

const RemoveButton = styled.button`
  font-size: 14px;
  background-color: #ffffff;
  color: #414344;
  cursor: pointer;
  border-radius: 15px;
  border: solid 1px #f3f3f3;
  margin-right: 8px;
  outline: none;
  &:hover {
    color: #ffffff;
    background-color: #7497ad;
  }
  @media (min-width: 768px) {
  }
`;
