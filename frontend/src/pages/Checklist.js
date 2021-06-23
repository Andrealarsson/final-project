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
import santorini from "../assets/santorini.jpg";
import checklist from "../assets/checklist.png";
import bin from "../assets/bin.png";

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

  const getOptions = (method) => {
    return {
      method: method,
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json'
      },
    };
  }

  useEffect(() => {
    fetch(API_URL("users/checklist"), getOptions('GET'))
      .then((res) => res.json())
      .then((data) => {
        console.log('GET', data);
        if (data.success) {
          dispatch(todos.actions.setItems(data.items));
          dispatch(todos.actions.setErrors(null));
        } else {
          dispatch(todos.actions.setErrors(data));
        }
      })
      .catch(errors);
  }, [accessToken, dispatch, history, errors]);

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
               {/* <TimeAdded>
            {moment(todo.createdAt).format('ddd HH:mm')}
          </TimeAdded>  */}
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

const TodoSection = styled.section`
  background-image: url("${italycoast}");
  background-size: cover;
  overflow-x: hidden;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (min-width: 1024px) {
    background-image: url("${santorini}");
  }
`;

const TitleContainer = styled.div`
  width: 80%;
  margin-top: 60px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  
  @media (min-width: 768px) {
    max-width: 800px;
  }
`;

const TodoIcon = styled.img`
  margin-right: 2px;
`;

const TodoTitle = styled.h2`
  color: #ffffff;
  font-size: 15px;
  margin: 0px;

  @media (min-width: 768px) {
    font-size: 17px;
  }
`;

const TodoListContainer = styled.div`
  width: 80%;
  min-height: 300px;
  
  @media (min-width: 768px) {
    max-width: 800px;
    margin-top: 20px;
  }
`;

const TodoItem = styled.div`
  background: #ffffff;
  color: black;
  margin: 3px;
  padding: 5px;
  border-radius: 2px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TodoDescription = styled.p`
color: #414344;
  font-size: 14px;
  margin: 0px;
  
  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const RemoveButton = styled.button`
  background-color: #ffffff;
  margin-right: 8px;
  padding: 10px 12px;
  cursor: pointer;
  border-radius: 50%;
  border: none;
  outline: none;
  &:hover {
    color: #ffffff;
    background-color: #f3f3f3;
  }
`;
