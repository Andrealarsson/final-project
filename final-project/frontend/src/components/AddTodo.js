import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';

import todos from '../reducers/todos'
import styled from 'styled-components'

const AddTodo =() => {
  const [value, setValue] = useState ('')
  const dispatch = useDispatch()

  const onFormSubmit = (e) => {
    e.preventDefault()

    const newTodo = {
      id: uuidv4(), 
      description: value, 
      time: Date.now(),
      isComplete: false,
    }
    dispatch(todos.actions.addTodo(newTodo))
    setValue('')
  }
  return(
    <>
      <TodoForm onSubmit={onFormSubmit}>
      <AddButton type='submit' disabled={
          value.length < 3 || value.length > 140 }>
          {" "}+{" "}
        </AddButton>
        <TodoInput
          type='text'
          required
          value={value}
          placeholder="Lägg till..."
          onChange={e => setValue (e.target.value)}
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

@media (min-width: 768px) {
  margin-top: 20px;
  max-width: 800px;
}
`
const TodoInput = styled.input`
background-color: rgba(0, 0, 0, 0.56);
color: #ffffff;
border: none;
border-radius: 2px;
overflow-wrap: break-word;
resize: none;
height: 55px;
// min-width: 210px;
outline: none;
@media (min-width: 768px) {
  min-height: 60px;
  min-width: 313px;
  font-size: 16px;
} 
`
const AddButton = styled.button`
height: 57px;
width: 57px;
font-size: 20px;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
border: none;
border-radius: 2px;
background-color: rgba(0, 0, 0, 0.56);
color: #ffffff;
outline: none;
// &:hover {
//   background-color: #e58819;
//   color: #112d32;
//   border: none;
// }
&:disabled {
  background-color: rgba(0, 0, 0, 0.56);
  color: #ffffff;
  border: none;
  cursor: arrow;
}
@media (min-width: 768px) {
  height: 65px;
  width: 65px;
  font-size: 40px;
} 
`