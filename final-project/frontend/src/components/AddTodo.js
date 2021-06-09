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
      <AddTodoText></AddTodoText>
      <TodoForm onSubmit={onFormSubmit}>
        <TodoInput
          type='text'
          required
          value={value}
          placeholder="Packa ner. . .✏️"
          onChange={e => setValue (e.target.value)}
        />
        <AddButton type='submit' disabled={
          value.length < 3 || value.length > 140 }>
          {" "}+{" "}
        </AddButton>
      </TodoForm>
    </>
  )
}

export default AddTodo

const AddTodoText = styled.p`
color: #ffffff;
padding-top: 10px;
`
const TodoForm = styled.form`
padding: 5px 10px 20px 10px;
display: flex;
justify-content: center;
align-items: center;
`
const TodoInput = styled.input`
background-color: #fff;
border-radius: 5px;
border: solid 2px #88bdbc;
overflow-wrap: break-word;
resize: none;
min-height: 45px;
min-width: 210px;
margin 3px;
outline: none;
@media (min-width: 768px) {
  min-height: 60px;
  min-width: 313px;
  font-size: 16px;
} 
`
const AddButton = styled.button`
height: 50px;
width: 50px;
border-radius: 5px;
font-size: 43px;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
border: none;
background-color: #88bdbc;
color: #ffffff;
outline: none;
&:hover {
  background-color: #e58819;
  color: #112d32;
  border: none;
}
&:disabled {
  background-color: #ffffff;
  color: #112d32;
  border: none;
  cursor: arrow;
}
@media (min-width: 768px) {
  height: 65px;
  width: 65px;
  font-size: 40px
} 
`