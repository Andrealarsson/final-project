import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import moment from 'moment';
import todos from '../reducers/todos'
// import user from '../reducers/user'
import AddTodo from '../components/AddTodo'
// import TodoList from '../components/TodoList'
// import RemoveAllTodos from '../components/RemoveAllTodos'
import styled from 'styled-components/macro'
import { API_URL } from '../reusable/urls' 


const Checklist = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  const userId = useSelector(store => store.user.userId)
  const todosItems = useSelector(store => store.todos.items)  
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!accessToken) {
    history.push('/');
    }
  }, [accessToken, history]);

  useEffect(() => {
    const options = {
        method: 'GET',
        headers: {
          Authorization: accessToken
        }  
    }
    fetch(API_URL(`users/${userId}/checklist`), options)
    .then((res) => res.json())
    .then(data => {
        if(data.success) { 
          dispatch(todos.actions.setItems(data.items))
            // {_id: data._id, description: data.description, createdAt: data.createdAt, isComplete: data.isComplete})) 
          dispatch(todos.actions.setErrors(null))
        
        } else {
          dispatch(todos.actions.setErrors(data))
        }
    })
    .catch()
 },[accessToken, userId, dispatch])

 console.log(todosItems)

return (
  <>
    <AddTodo/>
    <TodoListContainer>
      {todosItems.map((todo) => (
        <TodoItem key={todo._id}>
          <Checkbox
            type='checkbox'
            checked={todo.isComplete}
            onChange={() => dispatch(todos.actions.toggleComplete(todo._id))}
          />
          <p style={{ textDecoration: todo.isComplete ? "line-through" : "" }}>
            {todo.description}
          </p>
          <RemoveButton onClick={() => dispatch(todos.actions.removeTodo(todo._id))}>
            Ta bort
          </RemoveButton>    
           <TimeAdded>
            {moment(todo.createdAt).format('ddd HH:mm')}
          </TimeAdded>
          </TodoItem>
      ))}  
    </TodoListContainer>
  </>
)
}


export default Checklist

const TodoListContainer = styled.div`
border-radius: 5px;
min-height: 280px;
background: #ffffff;
`
const TodoItem = styled.div`
position: relative;
border-radius: 5px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
background: #ffffff;
color: black;
margin: 3px;
padding: 5px;
`
const TimeAdded = styled.p`
font-size: 10px;
position: absolute;
left: 252px;
top: 1px;
margin: 2px;
@media (min-width: 768px) {
font-size: 11px;
left: 340px;
}`

const Checkbox = styled.input`
transform: scale(1.7);
margin: 10px;
cursor: pointer;
filter: invert(90%);
@media (min-width: 768px) {
transform: scale(1.9);
}
`
const RemoveButton = styled.button`
font-size: 13px;
background-color: #ffffff;
color: red;
cursor: pointer;
border-radius: 15px;
border: solid 1px #F3F3F3;
margin-right: 8px;
outline: none;
&:hover {
color: #ffffff;
background-color: #F3F3F3;
}
@media (min-width: 768px) {
}`
  