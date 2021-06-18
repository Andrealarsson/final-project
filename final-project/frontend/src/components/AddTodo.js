import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import styled from 'styled-components/macro'
import { API_URL } from '../reusable/urls'
import todos from '../reducers/todos'
import user from '../reducers/user'

  const AddTodo = () => {
    const [newTodo, setNewTodo] = useState('')
    const userId = useSelector(store => store.user.userId)
    const accessToken = useSelector((store) => store.user.accessToken)
    const errors = useSelector((store) => store.todos.errors)

    const dispatch = useDispatch()

    const onFormSubmit = (e) => {
      e.preventDefault()

      const options = {
        method: 'POST',
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          todos: newTodo
        })
      }
        fetch(API_URL(`users/${userId}/checklist`), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            console.log('data succes', data.success)
              console.log('data.todos', data.items)
              dispatch(todos.actions.addNewTodo(data.items)) 
              dispatch(todos.actions.setErrors(null))
          } else {
            dispatch(todos.actions.setErrors(data))
          }
    })
    setNewTodo('')
  }
 
    return (
      <>
        <TodoForm onSubmit={onFormSubmit}>
        <AddButton type='submit' disabled={
            newTodo.length < 3 || newTodo.length > 140 }>
            {" "}+{" "}
          </AddButton>
          <TodoInput
            type='text'
            required
            value={newTodo}
            placeholder="Lägg till..."
            onChange={(e) => setNewTodo (e.target.value)}
          />
          
        </TodoForm>
      </>
    )
  }
  
  export default AddTodo

const TodoForm = styled.form`
// padding: 5px 10px 20px 10px;
width: 80%;
display: flex;
flex-direction: row;
align-items: center;

@media (min-width: 768px) {
  margin-top: 20px;
  max-width: 800px;
}
`
const TodoInput = styled.input`
background-color: rgba(0, 0, 0, 0.56);
color: #ffffff;
resize: none;
height: 55px;
width: 100vw;
border-radius: 2px;
border: none;
padding: 0px;
overflow-wrap: break-word;
outline: none;
@media (min-width: 768px) {
  min-height: 60px;
  min-width: 313px;
  font-size: 16px;
} 
`
const AddButton = styled.button`
background-color: rgba(0, 0, 0, 0.56);
color: #ffffff;
height: 55px;
width: 65px;
font-size: 20px;
border-radius: 2px;
border: none;
padding: 0px;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
outline: none;
&:hover {
  color: #7497AD;
  font-size: 20px;

@media (min-width: 768px) {
  height: 65px;
  width: 65px;
  font-size: 40px;
} 
`