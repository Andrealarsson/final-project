/*import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

import todos from '../reducers/todos'
import styled from 'styled-components'

const TodoList =() => {
  const items = useSelector(store => store.todos.items)
  const dispatch = useDispatch()
  
  return (
    <>
      <TodoListContainer>
        {items.map(todo => (
          <TodoItem key={todo.id}>
            <Checkbox
              type='checkbox'
              checked={todo.isComplete}
              onChange={() => dispatch(todos.actions.toggleComplete(todo.id))}
            />
            <p style={{ textDecoration: todo.isComplete ? "line-through" : "" }}>
              {todo.description}
            </p>
            <RemoveButton onClick={() => dispatch(todos.actions.removeTodo(todo.id))}>
              🗑 
            </RemoveButton>    
             <TimeAdded>
              {moment(todo.time).format('ddd HH:mm')}
            </TimeAdded>
          </TodoItem>
        ))}
      </TodoListContainer>
    </>
  )
}

export default TodoList

const TodoListContainer = styled.div`
border-radius: 5px;
min-height: 280px;
background: #112d32;
`
const TodoItem = styled.div`
position: relative;
border-radius: 5px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
background: #88bdbc;
color: #ffffff;
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
transform: scale(1.7);
background-color: #88bdbc;
color: #ffffff;
cursor: pointer;
border: none;
border-radius: 3px;
margin-right: 8px;
outline: none;
&:hover {
  color: #112d32;
}
@media (min-width: 768px) {
  transform: scale(1.9);
}`*/