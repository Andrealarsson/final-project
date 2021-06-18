import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import styled from 'styled-components/macro'
import Checkbox from "@material-ui/core/Checkbox"

import { API_URL } from '../reusable/urls'
import todos from '../reducers/todos'
// import user from '../reducers/user'
import AddTodo from '../components/AddTodo'
import Navbar from '../components/Navbar'
import italycoast from '../assets/italycoast.jpg'
import italy from '../assets/italy.jpg'
import checklist from '../assets/checklist.png'


const Checklist = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  const userId = useSelector(store => store.user.userId)
  const todosItems = useSelector(store => store.todos.items)  
  const errors = useSelector((store) => store.todos.errors)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!accessToken) {
    history.push('/')
    }
 /* }, [accessToken, history])

  useEffect(() => {*/
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
          dispatch(todos.actions.setErrors(null))
          localStorage.setItem('accessToken', data.accessToken)
        } else {
          dispatch(todos.actions.setErrors(data))
        }
    })
    .catch(errors)
 },[accessToken, userId, dispatch, history])


return (
  <>
    <TodoSection>
      <Navbar/>
      <TitleContainer>
        <TodoIcon src= {checklist} width='23' height='23' alt='checklist icon'/>
        <TodoTitle>Checklista</TodoTitle>
      </TitleContainer>
      <TodoListContainer>
        {todosItems.map((todo) => (
        <TodoItem key={todo._id}>
          <Checkbox
            color='default'
            type='checkbox'
            checked={todo.isComplete}
            onChange={() => dispatch(todos.actions.toggleComplete(todo._id))}
          />
           {/* <TimeAdded>
            {moment(todo.createdAt).format('ddd HH:mm')}
          </TimeAdded> */}
          <TodoDescription style={{ textDecoration: todo.isComplete ? "line-through" : "" }}>
            {todo.description}
          </TodoDescription>
          <RemoveButton onClick={() => dispatch(todos.actions.removeTodo(todo._id))}>
            Radera
          </RemoveButton>    
        </TodoItem>
        ))}  
      </TodoListContainer>
      <AddTodo/>
    </TodoSection>
  </>
)
}

export default Checklist

const TodoSection = styled.section`
background-image: url('${italycoast}');
background-size: cover;
height: 100vh;
display: flex; 
align-items: center;
justify-content: center;
flex-direction: column;

@media (min-width: 1024px) {
  background-image: url('${italy}');
}
`
const TitleContainer = styled.div`
display: flex;
flex-direction: row;
width: 80%;
align-items: center;

@media (min-width: 768px) {
  max-width: 800px;
}
`

const TodoIcon = styled.img`
margin-right: 2px;
`
const TodoTitle = styled.h2`
color: #ffffff;
font-size: 18px;
margin: 0px;
`
const TodoListContainer = styled.div`
min-height: 300px;
width: 80%;

@media (min-width: 768px) {
  margin-top: 20px;
  max-width: 800px;
}

`
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
`
const TodoDescription = styled.p`
margin: 5px;
color: #414344;`

const TimeAdded = styled.p`
font-size: 10px;
// position: absolute;
left: 50px;
margin: 2px;

@media (min-width: 768px) {
font-size: 11px;
}`

const RemoveButton = styled.button`
font-size: 13px;
background-color: #ffffff;
color: #414344;
cursor: pointer;
border-radius: 15px;
border: solid 1px #F3F3F3;
margin-right: 8px;
outline: none;
&:hover {
color: #ffffff;
background-color: #7497AD;
}
@media (min-width: 768px) {
}`
  