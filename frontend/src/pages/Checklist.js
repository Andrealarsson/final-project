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
          console.log(data);
          batch(() => {
            dispatch(todos.actions.setItems(data.items));
            dispatch(todos.actions.setErrors(null));
          });
        } else {
          dispatch(todos.actions.setErrors(data));
        }
      });
    // return fetch(API_URL("users/checklist"), getOptions('GET'))
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.success) {
    //       batch(() => {
    //         dispatch(todos.actions.setItems(data.items));
    //         dispatch(todos.actions.setErrors(null));
    //       });
    //     } else {
    //       dispatch(todos.actions.setErrors(data));
    //     }
    //   });
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
          console.log('CHECK', data);
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
  display: flex;
  flex-direction: row;
  width: 80%;
  align-items: center;
  margin-top: 120px;
  margin-bottom: 10px;

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
  @media (min-width: 768px) {
    font-size: 16px;
  }

`;

const RemoveButton = styled.button`
  background-color: #ffffff;
  cursor: pointer;
  border-radius: 50%;
  border: none;
  margin-right: 8px;
  padding: 10px 12px;
  outline: none;
  &:hover {
    color: #ffffff;
    background-color: #f3f3f3;
  }
  @media (min-width: 768px) {
  }
`;
